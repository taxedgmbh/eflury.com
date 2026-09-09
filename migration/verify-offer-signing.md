# Verify the offer-link signature is byte-compatible

`accept.php` signs offer links with HMAC-SHA256, and `src/lib/server/offer.ts`
reproduces that scheme so links already sitting in a client's inbox keep working
after the cutover. Those links carry a 60-day TTL, so some will be in flight.

The two implementations were matched by inspection — same algorithm, same field
order, same `|` separator, same lowercase hex — but PHP is not installed on the
development machine, so this was **not** confirmed by running both.

Confirm it on any box with PHP (the Hostinger host will do) before relying on
old links:

```bash
SECRET='<the real ACCEPT_SECRET from api/config.php>'
PAYLOAD='OF-2026-001|Automatisierung Monatsabschluss|CHF 24900|kunde@example.ch|Muster AG|de|1790000000'

php -r "echo hash_hmac('sha256', '$PAYLOAD', '$SECRET'), \"\n\";"
node -e "const{createHmac}=require('crypto');console.log(createHmac('sha256','$SECRET').update('$PAYLOAD').digest('hex'))"
```

The two lines must be identical. With the throwaway secret `test-secret-123`
the Node implementation produces:

```
e6d900c9a30dcdcd3ec3d4c02369564f427bb8928de03a6c912f10f824145092
```

If they differ, do not migrate `ACCEPT_SECRET` as-is: mint fresh links for any
outstanding offers instead, and treat previously sent links as void.

## Also carried over

- **Idempotency.** `accept.php` used a marker file per offer number; the route
  uses `create()` on a document keyed by that number, which throws if it already
  exists. A double submit returns `{ok:true, already:true}` and writes nothing.
- **Evidence fields.** Timestamp, offer details, acceptor name and function,
  AGB version and URL, both confirmations, IP, User-Agent, link signature.
- **IP retention.** Kept in full here, unlike the rate limiter where IPs are
  salted and hashed. For an acceptance record, being able to show who accepted
  what and when is the purpose.
- **Bilingual.** The marketing site is German-only; contracts are not.
