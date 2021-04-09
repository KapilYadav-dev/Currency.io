const express = require("express");
const TeachableMachine = require("@sashido/teachablemachine-node");
const app = express();
const port = process.env.PORT || 8080;
const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/ltBYD1AkH/"
});


app.get("/classify", async (req, res) => {
  const url = req.query.url;

  return model.classify({
    imageUrl: url,
  }).then((predictions) => {
    var number=Math.max(predictions[0].score,predictions[1].score,predictions[2].score,predictions[3].score,predictions[4].score,predictions[5].score,predictions[6].score)
    var index =predictions.findIndex(x => x.score == number);
    console.log(predictions);
    return res.json({
        "Result :":predictions[index].class,
        "Probability":predictions[index].score,
        "imgUrl":url
    });
  }).catch((e) => {
    console.error(e);
    res.status(500).send("Something went wrong!")
  });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});