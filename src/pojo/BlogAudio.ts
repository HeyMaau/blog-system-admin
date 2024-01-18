export class BlogAudio {

    private _id: string | undefined | null
    private _name: string
    private _album: string
    private _artist: string
    private _audioUrl: string
    private _coverUrl: string
    private _audioOrder: number


    constructor(id: string | undefined | null, name: string, album: string, artist: string, audioUrl: string, coverUrl: string, audioOrder: number) {
        this._id = id;
        this._name = name;
        this._album = album;
        this._artist = artist;
        this._audioUrl = audioUrl;
        this._coverUrl = coverUrl;
        this._audioOrder = audioOrder;
    }


    get id(): string | undefined | null {
        return this._id;
    }

    set id(value: string | undefined | null) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get album(): string {
        return this._album;
    }

    set album(value: string) {
        this._album = value;
    }

    get artist(): string {
        return this._artist;
    }

    set artist(value: string) {
        this._artist = value;
    }

    get audioUrl(): string {
        return this._audioUrl;
    }

    set audioUrl(value: string) {
        this._audioUrl = value;
    }

    get coverUrl(): string {
        return this._coverUrl;
    }

    set coverUrl(value: string) {
        this._coverUrl = value;
    }

    get audioOrder(): number {
        return this._audioOrder;
    }

    set audioOrder(value: number) {
        this._audioOrder = value;
    }
}