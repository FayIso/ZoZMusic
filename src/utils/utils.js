

module.exports = {
    keygen: (length) => {
        var result = [];
        var characters = '0123456789*[]/-+=ABCDEFGHIJKLMNOPabcdefghijklmnop';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    },
    passgen: (length) => {
        var result = [];
        var characters = "ABCD0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(
                characters.charAt(Math.floor(Math.random() * charactersLength))
            );
        }
        return result.join("");
    }

}