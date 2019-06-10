export const isArrayFromRunes =
    (input: Array<object>): input is Array<Rune> => {
        return input instanceof Array &&
            input.every((rune) => (
                Object.keys(rune).every((item) => (
                    ["rune_id",
                        "rune_name",
                        "rune_image",
                        "rune_meaning"]
                        .includes(item)))))
    }

export const isArrayFromSpreads =
    (input: Array<object>): input is Array<Spread> => {
        return input instanceof Array &&
            input.every((spread) => (
                Object.keys(spread).every((item) => (
                    ["spread_id",
                        "spread_name",
                        "spred_description",
                        "spread_runes_count"]
                        .includes(item)))))
    }