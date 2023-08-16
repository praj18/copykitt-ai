import os
import openai
import argparse
import re
from typing import List

MAX_INPUT_LENGTH = 32


def main():
    # print("Running Copy Kitt!")

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
        generate_branding_snippet(user_input)
        generate_keywords(user_input)
        # print(branding_result)
        # print(keywords_result)
    else:
        raise ValueError(
            f"Input length must be {MAX_INPUT_LENGTH} characters or shorter"
        )
    pass


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


# # Load openAI API Key
# openai.api_key = os.getenv("OPENAI_API_KEY")

# subject = "coffee"
# prompt = f"Generate upbeat branding snippet for {subject}"


# response = openai.Completion.create(
#     engine="davinci-instruct-beta-v3", prompt=prompt, max_tokens=32
# )
# print(response)


def generate_keywords(prompt: str) -> List[str]:
    # # Load openAI API Key
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Generate related branding keywords for {prompt}"

    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=32
    )
    # print(response)

    # Extract output text
    keywords_text: str = response["choices"][0]["text"]
    # Strip whitespace
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]
    print(f"Keywords: {keywords_array}")

    return keywords_array


def generate_branding_snippet(prompt: str) -> str:
    # # Load openAI API Key
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Generate upbeat branding snippet for {prompt}"

    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=32
    )
    # print(response)

    # Extract output text
    branding_text: str = response["choices"][0]["text"]
    # Strip whitespace
    branding_text = branding_text.strip()

    # Add ellipsis
    last_char = branding_text[-1]

    if last_char not in {".", "!", "?", '"'}:
        branding_text += "..."
    print(f"Snippet: {branding_text}")
    return branding_text


if __name__ == "__main__":
    main()
