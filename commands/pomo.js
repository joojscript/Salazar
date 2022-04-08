module.exports = {
  name: "pomo",
  description: "Starts a pomodoro timer for you!",
  args: true,
  usage: "pomo <WORK-RUN-TIME> <SHORT-BREAK-TIME-IN-MINUTES>",
  guildOnly: false,
  execute(message, args) {
    /**
     * The Pomodoro technique states that we should do our work in 25 minute intervals.
     * 3 minutes of work followed by 5 minutes of rest, and after 3 of these breaks, take a long one of 25 min.
     */
    const workRunTime = (args[1] || 25) * 60000; // 25 minutes
    const shortBreakTime = (args[3] || 5) * 60000; // 5 minutes

    setTimeout(() => {
      message.channel.send(`${message.author} Time's for a short break!`);
    }, workRunTime);
    setTimeout(() => {
      message.channel.send(`${message.author}, back on track!`);
    }, workRunTime + shortBreakTime);
    setTimeout(() => {
      message.channel.send(`${message.author} Time for another short break!`);
    }, workRunTime * 2 + shortBreakTime);
    setTimeout(() => {
      message.channel.send(`${message.author} Let's get back!`);
    }, workRunTime * 2 + shortBreakTime * 2);
    setTimeout(() => {
      message.channel.send(
        `${message.author} Time to rest a little bit longer! Good job!`
      );
    }, workRunTime * 3 + shortBreakTime * 2);

    message.channel.send(
      `You're all set, ${message.author}! Start doing what you do best!`
    );
  },
};
