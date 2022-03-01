const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 8080;

const websiteFolderName = "Website";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


function paths(dir, fileName = websiteFolderName)
{
    let fileArr = fs.readdirSync(dir);
    for (let i = 0; i < fileArr.length; i++)
    {
        try
        {
            if (fs.lstatSync(path.join(dir, fileArr[i])).isDirectory()) //If the file is a directory, recursively go through the new folder
            {
                paths(path.join(dir, fileArr[i]), fileName + "/" + fileArr[i]);
            }
            else
            {
                if (fileArr[i].includes(".html"))
                {
                    console.log(`Available paths: ${fileName.replace(websiteFolderName, "")}/${fileArr[i].replace(".html", "")}`);
                    if (fileArr[i].replace("index.html", "") == "" || fileArr[i] == "/")
                    {
                        app.get(`${fileName.replace(websiteFolderName, "")}/`, (request, response) =>
                        {
                            response.sendFile(path.join(__dirname, fileName, "index.html"));
                        });
                    }
                    else
                    {
                        app.get(`${fileName.replace(websiteFolderName, "")}/${fileArr[i].replace(".html", "")}`, (request, response) =>
                        {
                            response.sendFile(path.join(__dirname, fileName, fileArr[i]));
                        });
                    }
                }
                else if (fileArr[i].includes(".css"))
                {
                    app.get(`${fileName.replace(websiteFolderName, "")}/${fileArr[i]}`, (request, response) =>
                    {
                        response.sendFile(path.join(__dirname, fileName, fileArr[i]));
                    });
                }
            }
        }
        catch
        {

        }
    }
}

app.listen(port, () =>
{
    paths(path.join(__dirname, websiteFolderName));

    console.log(`Server listening at port ${port}`);
})