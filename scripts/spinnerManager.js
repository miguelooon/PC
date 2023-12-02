const { exec } = require('child_process');
const Spinner = require('cli-spinner').Spinner;

const startSpinnerAndExecute = (command, onSuccess, onError) => {
  const spinner = new Spinner('%s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  exec(command, (error, stdout, stderr) => {
    spinner.stop(true);

    if (error) {
      onError(error);
      return;
    }

    onSuccess(stdout, stderr);
  });
};

module.exports = {
  startSpinnerAndExecute
};
