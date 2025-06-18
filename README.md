# Meta Fastq

Meta Fastq is an in-browser application for quickly viewing metadata from FASTQ files. It is designed to be accessible to laboratory personnel without requiring command-line tools or programming experience.

### What It Does
Meta Fastq allows users to upload up to 96 FASTQ files (compressed or uncompressed) and view summarized metadata in a user-friendly table. It is built to handle very large FASTQ files efficiently by streaming the contents instead of loading them entirely into memory.

### Key Features
- Supports compressed (.gz) and uncompressed FASTQ files
- Streams files using modern JavaScript streams API for memory efficiency
- Displays parsed metadata in an interactive table
- Export results as CSV or TSV, or copy to clipboard
- No server, no installation – 100% in-browser
- Tailored for laboratory users, not programmers

### Tech Stack
- React
- Vite
- TypeScript
- Chakra UI

### Target Audience
This tool was built for laboratory personnel who may not have the ability or familiarity to use traditional command-line tools like Bash. Meta Fastq brings the power of quick file introspection to the browser, with zero setup and minimal technical know-how.

### Usage
- Open the app in your browser.
- Upload up to 96 FASTQ files (gzip-compressed or plain text).
- View metadata such as instrument Id, instrument type, run number, and more.
- Export the results to CSV or TSV, or copy the table to your clipboard for use in other applications.

### Limitations
- Only processes up to 96 files at once.
- This tool does not perform quality trimming, alignment, or any downstream analysis—just metadata extraction.
- Provides the most information for Illumina platform generated Fastq data.

### Why This Exists
While parsing FASTQ files is trivial for those comfortable with Bash or Python, many lab users don't have access to those environments or the skills to use them. Meta Fastq fills this gap with a modern, browser-based solution.

### References
- Instrument and flow cell metadata was derived from the community discussion on BioStars: [https://www.biostars.org/p/198143/](https://www.biostars.org/p/198143/)
- Regular expression patterns for flow cell ID recognition were heavily borrowed from: [https://github.com/nickp60/fcid](https://github.com/nickp60/fcid)