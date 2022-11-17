import fs from 'fs';
import cors from 'cors';
import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors());

// Home Page file system
app.get("/", (req,res)=>{
    res.send("NODE FILESYSTEM TASK");
    res.json({
        message: `/create-> To CREATE .txt file`
    })
});

// To Create .txt file
app.get("/create",function (req,res){
    let timestamp = new Date();
    let filename = timestamp.getDate()+"-"+timestamp.getMonth()+"-"+timestamp.getFullYear()+" "+timestamp.getHours()+"-"+timestamp.getMinutes();
    fs.writeFile(`${filename}.txt`, `${timestamp}`,()=>{
        console.log("File Creation Done Sucessfully")
    })
    res.json({ message:`${filename}.txt File Created`,
               filename:`${filename}.txt`
            })
})

// To READ all txt_files

app.get("/read", function(req,res){
    let txt_files=[];
    fs.readdir(__dirname, function(err,files){
        //error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach(function (file){
            if(file.endsWith(".txt")){
                txt_files.push(file);
            }
        });
        res.json({
            file_names:txt_files
        })
    });
})

app.listen(process.env.PORT||3001)