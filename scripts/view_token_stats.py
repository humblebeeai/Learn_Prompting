#!/usr/bin/env python3
"""
View translation token usage statistics.
"""
import json
from pathlib import Path

TOKEN_STATS_FILE = Path("sample_translation/token_stats.json")

def view_token_stats():
    """Display token usage statistics."""
    if not TOKEN_STATS_FILE.exists():
        print("[INFO] No token statistics found yet.")
        print("Run the translation script first: python scripts/translate_all_mdx.py")
        return
    
    try:
        with open(TOKEN_STATS_FILE, 'r', encoding='utf-8') as f:
            stats = json.load(f)
        
        total_input = stats.get("total_input_tokens", 0)
        total_output = stats.get("total_output_tokens", 0)
        total_cost = stats.get("total_cost", 0.0)
        last_updated = stats.get("last_updated", "Unknown")
        
        print("="*80)
        print("TRANSLATION TOKEN USAGE STATISTICS")
        print("="*80)
        print(f"Last Updated:           {last_updated}")
        print(f"\nInput Tokens:           {total_input:,}")
        print(f"Output Tokens:          {total_output:,}")
        print(f"Total Tokens:           {total_input + total_output:,}")
        print(f"\nTotal Cost (USD):       ${total_cost:.4f}")
        print(f"\nModel:                  gpt-4o")
        print(f"Input Rate:             $0.005 per 1K tokens")
        print(f"Output Rate:            $0.015 per 1K tokens")
        print("="*80)
        
        # Cost breakdown
        input_cost = total_input * 0.005 / 1000
        output_cost = total_output * 0.015 / 1000
        
        print(f"\nCost Breakdown:")
        print(f"  Input:  {total_input:,} tokens × $0.005/1K = ${input_cost:.4f}")
        print(f"  Output: {total_output:,} tokens × $0.015/1K = ${output_cost:.4f}")
        print(f"  Total:  ${input_cost + output_cost:.4f}")
        print("="*80)
        
    except Exception as e:
        print(f"[ERROR] Could not read token statistics: {e}")

if __name__ == "__main__":
    view_token_stats()

