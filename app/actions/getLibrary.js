var result = [];

var options = {
    resource_type: "image",
    folder: "developer",
    max_results: 500,
};

export default async function getLibrary(next_cursor) {
    if (next_cursor) {
        options["next_cursor"] = next_cursor;
    }
    console.log(options);
    cloudinary.api.resources(options, function (error, res) {
        if (error) {
            console.log(error);
        }
        var more = res.next_cursor;
        resources = res.resources;

        for (var res in resources) {
            res = resources[res];
            var resultTemp = [];
            var url = res.secure_url;
            resultTemp.push(url);
            result.push(resultTemp);
        }

        if (more) {
            getLibrary(more);
        } else {
            console.log("done");
        }
    });

    return result;
}