const fs = require("fs");

function DataAggregation() {
    let years_list = ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]
    let d = {}
    let type = ["REG", "PST"] // "PRE"
    for (let a = 0; a < years_list.length; a++) {
      for (let b = 0; b < type.length; b++) {
        let fn = "./NHL" + years_list[a] + type[b] + ".json"
        let temp = require(fn);
        d[years_list[a] + "_" + type[b]] = temp;
      }
    }
    console.log(d)
    fs.writeFile("./../src/NHL.json", JSON.stringify(d), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    })
  }

DataAggregation()
