async function* readStream(reader: ReadableStreamDefaultReader<string>): AsyncGenerator<string> {
    let done = false;
    while (!done) {
        const {done: d, value} = await reader.read();
        done = d;
        if (value) {
            yield value;
        }
    }
}

export async function* streamGunzip(file: File): AsyncGenerator<string> {
    const reader: ReadableStreamDefaultReader<string> = file
        .stream()
        .pipeThrough(new DecompressionStream('gzip'))
        .pipeThrough(new TextDecoderStream())
        .getReader();

    yield* readStream(reader);
}

export async function* streamPlainText(file: File): AsyncGenerator<string> {
    const reader: ReadableStreamDefaultReader<string> = file
        .stream()
        .pipeThrough(new TextDecoderStream())
        .getReader();

    yield* readStream(reader);
}