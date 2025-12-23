#!/bin/bash
# Hook: Memory Suggester
# Analyzes user message and suggests relevant memory files to load

MESSAGE="$1"

# Define memory file triggers (keyword patterns)
declare -A MEMORY_TRIGGERS=(
    ["migration-history"]="migration|deploy|build|github actions|workflow|astro|hosting"
    ["competitive-analysis"]="competitor|market|pricing benchmark|swiss market|owt|aether|what.digital|positioning|differentiate"
    ["service-packages"]="package|pricing|deliverable|eflury method|starter|professional|enterprise|service offering"
    ["case-study-taxed"]="taxed gmbh|case study|roi|proof|results|metrics|automation story"
    ["blog-strategy"]="blog|content|seo|article|post|writing|keyword"
    ["tech-stack"]="technical|astro|three.js|component|implementation|configuration|debug"
    ["website-strategy"]="website design|seo strategy|llm optimization|lead generation|interactive tools|swiss business culture|trust signals"
    ["customer-personas"]="customer persona|buyer profile|ideal client|ceo thomas|cfo sandra|cto marco|operations manager"
    ["agent-execution-plan"]="agent|execution plan|phase|deliverable|timeline|launch agent|coordinate|primary coordinator"
)

# Check for triggers in message (case-insensitive)
SUGGESTED=""
for FILE in "${!MEMORY_TRIGGERS[@]}"; do
    PATTERN="${MEMORY_TRIGGERS[$FILE]}"
    if echo "$MESSAGE" | grep -iE "$PATTERN" > /dev/null; then
        SUGGESTED="$SUGGESTED\n  - $FILE.md"
    fi
done

# Output suggestion if matches found
if [ -n "$SUGGESTED" ]; then
    echo ""
    echo "💡 Memory files available for this topic:"
    echo -e "$SUGGESTED"
    echo ""
    echo "To load, say: 'Load migration history' or 'Load competitive analysis'"
fi
