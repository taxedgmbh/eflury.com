#!/bin/bash
# Hook: Context Monitor
# Warns if context usage is getting high and suggests cleanup

# Note: This is a simplified version. In production, you'd parse the actual context usage.
# For now, we'll just remind about memory management every ~20 messages.

MESSAGE_COUNT_FILE=".claude/.message_count"

# Initialize or read message count
if [ -f "$MESSAGE_COUNT_FILE" ]; then
    COUNT=$(<"$MESSAGE_COUNT_FILE")
else
    COUNT=0
fi

# Increment count
COUNT=$((COUNT + 1))
echo "$COUNT" > "$MESSAGE_COUNT_FILE"

# Remind about context management every 20 messages
if [ $((COUNT % 20)) -eq 0 ]; then
    echo ""
    echo "ℹ️  Context Management Tip: If you've loaded memory files and finished that topic,"
    echo "   consider starting a new conversation to free up context space."
    echo ""
fi
