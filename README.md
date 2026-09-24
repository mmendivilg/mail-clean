# Mail Clean

Mail Clean is a planned personal app that runs locally and uses cloud AI to identify unwanted Gmail messages based on rules you define. It will put flagged messages in a review queue so you can decide what to keep or delete.

## Status

The app has not been built yet. The filtering rules and AI provider still need to be chosen. The workflow and features below describe the intended app, not functionality currently available.

## Planned workflow

1. **Connect to Gmail** securely through Google sign-in.
2. **Scan existing emails** and classify them using your filtering criteria and a cloud AI provider.
3. **Review flagged emails** in a queue, with reasons explaining why each message was flagged.
4. **Choose what happens next:** keep a message, move it to Trash, or permanently delete it.

## Planned date-based cleanup

Choose a cutoff date to find and delete all emails received before that date. For example, “delete all emails older than 2014” means emails received before January 1, 2014.

Matching emails will appear in the review queue, where you can keep individual messages or bulk move them to Trash or permanently delete them.

## Future plans

- Allow automatic deletion for categories you trust.
- Scan only new mail after the initial scan.

## Local app, cloud AI

The app will run on your own computer, but AI classification will use a cloud provider. The provider and the email data sent for classification still need to be determined.
