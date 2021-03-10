exports.processMessage = async event => {
  try {
    for await (const record of event.Records) {
      const message = JSON.parse(record.body);

      console.log(`[DEBUG] received this message`, message);
    }
    return;
  } catch (err) {
    console.log(`failed to parse messages:`, err);

    return;
  }
};
