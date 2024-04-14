import express from "express"
import OpenAI from "openai"
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import ConvModel from './models/Conv.js'
import FileModel from './models/File.js'

const app = express()
app.use(bodyParser.json());
app.use(cors())


mongoose.connect("mongodb+srv://vlosztrovszky:flyprojecta@projectadb.apsiwzw.mongodb.net/");

const openai = new OpenAI({
    apiKey: "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"
});

app.put("/addConv",async(req,res)=>{
  const name=req.body.name;
  const newConv=new ConvModel({name});
  await newConv.save();
  res.json(newConv);
})

app.put("/addFile",async(req,res)=>{
  const text=req.body.text;
  const idc=req.body.idc;
  const name=req.body.name;
  const newFile=new FileModel({text,idc,name});
  await newFile.save();
  res.json(newFile);
})

app.post("/getFileText",async (req,res)=>{
  try{
    const idc=req.body.idc;
    const result = await FileModel.find({idc},'text -_id');
    res.json(result);
  } catch (err) {
    res.json(err);
  }
})

app.post("/getFileName",async (req,res)=>{
  try{
    const idc=req.body.idc;
    const result = await FileModel.find({idc},'name -_id');
    res.json(result);
  } catch (err) {
    res.json(err);
  }
})

app.get("/getConv",async (req,res)=>{
  try{
    const result = await ConvModel.find({});
    res.json(result);
  } catch (err) {
    res.json(err);
  }
})

app.post("/intrebare", async (req, res) => {
    async function main() {
        const content = "Salut foloseste doar informatiile din acest text si incearca sa raspunzi te rog la intrebare,daca informatiile date nu sunt de ajuns spune ,nu spune chestii care nu sunt date in fisier "+req.body.content; 
        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: content}],
          model: "gpt-3.5-turbo-0125",
        });
        res.json(completion.choices[0].message.content)
      }
    main();
})

app.post("/test", async (req, res) => {
    
     const content= "Salut genereaza un test din textul dat cu 5 intrebari , daca nu e destul informatie spune "+req.body.content;
     const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: content},{ role: "system", content : "Genereaza  intrebari cu 4 raspunsuri si raspunul corect dar nu il zi doar dupa ce utilizatorul raspunde"}],
        model: "gpt-3.5-turbo-0125",
      }
    );
     console.log(completion.choices[0].message.content);
     res.json(completion.choices[0].message.content)
});


app.post("/rezumat", async (req, res) => {
    
    const content= "Salut genereaza un rezumat pentru textul dat "+req.body.content;
    const completion = await openai.chat.completions.create({
       messages: [{ role: "user", content: content}],
       model: "gpt-3.5-turbo-0125",
     }
   );
    console.log(completion.choices[0].message.content);
    res.json(completion.choices[0].message.content)
});


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000, (err) => {
  console.log(err)
    console.log("Server is running on port 3000")
})
