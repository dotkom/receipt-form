import os

def get_and_validate_env():
    email_config = {
        "SENDER_EMAIL": os.environ.get("SENDER_EMAIL", "").strip(),
        "RECIPIENT_EMAIL": os.environ.get("RECIPIENT_EMAIL", "").strip(),
        "CC_RECIPIENT_EMAILS": [email.strip() for email in os.environ.get("CC_RECIPIENT_EMAILS", "").split(",") if email.strip()],
        "STORAGE_BUCKET": os.environ.get("STORAGE_BUCKET", "").strip(),
        "EMAIL_ENABLED": os.environ.get("EMAIL_ENABLED", "true").strip(),
        "ENABLE_DEBUG_INFO_IN_FRONTEND": os.environ.get("ENABLE_DEBUG_INFO_IN_FRONTEND", "false").strip()
    }

    if not email_config["SENDER_EMAIL"] or "@" not in email_config["SENDER_EMAIL"]:
        raise ValueError("SENDER_EMAIL missing or invalid")
    if not email_config["RECIPIENT_EMAIL"] or "@" not in email_config["RECIPIENT_EMAIL"]:
        raise ValueError("RECIPIENT_EMAIL missing or invalid")
    if not email_config["CC_RECIPIENT_EMAILS"]:
        raise ValueError("CC_RECIPIENT_EMAILS missing or empty")
    if not email_config["STORAGE_BUCKET"]:
        raise ValueError("STORAGE_BUCKET missing or empty")
    if not all("@" in email for email in email_config["CC_RECIPIENT_EMAILS"]):
        raise ValueError("Invalid email format in CC_RECIPIENT_EMAILS")

    if email_config["EMAIL_ENABLED"] not in ["true", "false"]:
        raise ValueError("EMAIL_ENABLED must be 'true' or 'false'")

    if email_config["ENABLE_DEBUG_INFO_IN_FRONTEND"] not in ["true", "false"]:
        raise ValueError("ENABLE_DEBUG_INFO_IN_FRONTEND must be 'true' or 'false'")

    return email_config
