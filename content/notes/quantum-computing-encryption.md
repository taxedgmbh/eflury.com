---
title: Why should a business think about quantum computing now?
description: Not because of quantum computers themselves, but because of encryption. What "harvest now, decrypt later" means and the first practical steps.
date: 2026-11-13
---

Most businesses will never run a quantum computer. They should still care, for one reason: encryption.

## The problem

Almost everything online is protected by public-key encryption: websites, email, VPNs, online banking, signed documents. Its security rests on mathematical problems that today's computers cannot solve in any useful time. A large enough quantum computer could solve some of them. Nobody knows exactly when such a machine will exist. Estimates move, but the direction does not.

## Why "later" is already now

Attackers do not need to wait. They can copy encrypted data today and decrypt it once the hardware exists. This is called "harvest now, decrypt later". For data that must stay confidential for ten years or more, such as contracts, health data, tax files or trade secrets, the risk starts with today's transmission, not with tomorrow's quantum computer.

## What has already happened

In August 2024 the US National Institute of Standards and Technology (NIST) published the first standards for post-quantum cryptography: FIPS 203 (ML-KEM) for exchanging keys, and FIPS 204 (ML-DSA) and FIPS 205 (SLH-DSA) for digital signatures. NIST has also proposed phasing out today's vulnerable algorithms by 2035. Browsers and large cloud providers have started to switch. The tools exist; the work now is adoption.

## The first practical steps

1. **Make an inventory.** Where does your business rely on encryption? Websites, VPN, email, backups, e-banking, signatures, connections to suppliers. Most companies cannot answer this today, and it is the hardest part.
2. **Rank by lifetime.** Data that must stay secret for many years comes first.
3. **Ask your providers.** Software and cloud vendors should be able to say when they support the new standards. Put the question into the next contract renewal.
4. **Build for change.** Systems where the encryption can be swapped without rebuilding everything ("crypto agility") make every later step cheaper.

## What I take from it

Quantum computing is often discussed as distant science. For a business, the useful question is simpler and close: which of our data needs to stay secret in 2035? That is the starting point. At [Skopa](https://skopa.ai/?utm_source=eflury.com&utm_medium=referral&utm_campaign=notes) we work on exactly this meeting point of artificial intelligence and quantum computing.

Sources: [NIST post-quantum cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography).
