import { Writable, Readable } from "stream";

class WriteMemory extends Writable {
    buffer: string;

    constructor() {
        super();
        this.buffer = "";
    }

    _write(chunk, _, next) {
        this.buffer += chunk;
        next();
    }

    reset() {
        this.buffer = "";
    }

}

const MockWriteStream = new WriteMemory();

const mockCreateWriteStream = jest.fn();
function mockFS() {
    const original = jest.requireActual("fs");
    return { ...original, createWriteStream: mockCreateWriteStream };
}

jest.mock("fs", () => mockFS());

import * as x9 from '../src/x9';
import * as fs from 'fs';

jest.mock('node-fetch');
import fetch from 'node-fetch';
import { nextTick } from "process";
const { Response } = jest.requireActual('node-fetch');

describe('fetchX9Dockerfile', () => {

    it('can fetch', async () => {
        mockCreateWriteStream.mockImplementation(() => {
            MockWriteStream.reset();
            return MockWriteStream;
        })

        const body = Readable.from(["body data"])
        fetch.mockReturnValue(Promise.resolve(new Response(body)));

        await x9.fetchX9Dockerfile('myDistro');

        expect(fetch).toHaveBeenCalledTimes(1)
        expect(mockCreateWriteStream).toBeCalledWith(expect.stringContaining('./X9.Dockerfile'));
        expect(MockWriteStream.buffer).toStrictEqual("body data")
    })
})