/* Used for inserting custom loaders in AngularCLI webpack config */

const fs = require('fs');
const commonCliConfig = 'node_modules/@angular/cli/models/webpack-configs/common.js';
const pug_rule = `\n{ test: /.(pug|jade)$/, loader: "apply-loader!pug-loader?self" },`;
const raw_rule = `\n{ test: /.(bpmn)$/, loader: "raw-loader" },`;


function addCustomRule(customRules) {

  fs.readFile(commonCliConfig, (err, data) => {

    if (err) { return err; }

    const configText = data.toString();

    // We made it this far, let's insert that rule
    const position = configText.indexOf('rules: [') + 8;

    let outputs = [
      configText.slice(0, position)
    ];

    customRules.forEach((customRule) => {

      // make sure we don't add the rule if it already exists
      if (configText.indexOf(customRule) < 0) {
        outputs.push(customRule);
      }

    });

    outputs.push(configText.slice(position));

    const file = fs.openSync(commonCliConfig, 'r+');
    fs.writeFile(file, outputs.join('')); // ta-da
    fs.close(file);

  });

}

addCustomRule([pug_rule, raw_rule]);


