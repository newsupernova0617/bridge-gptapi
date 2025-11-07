app.get("/schedule_priority", async (req, res) => {
  try {
    const input_json = await getExternalData();

    if (!input_json || input_json.length === 0) {
      return res.status(400).json({ error: "입력 일정 데이터가 비어있습니다." });
    }

    const response = await client.responses.create({
      model: "gpt-5-nano",
      reasoning: { effort: "low" },
      instructions: 
    //   프롬프트 다시 봐야함
    `
너는 회사의 특이사항의 중요도를 1~5로 평가하는 AI야.
입력은 JSON 배열 형태의 특이사항들이고, 각 특이사항에는 'title', 'date', 'description' 등의 정보가 있어?.
각 일정에 "priority" 필드를 추가해서 JSON 배열로 그대로 반환해줘.


      `,
      input: `다음 일정들의 중요도를 1~5로 판별:\n\`\`\`json\n${JSON.stringify(input_json, null, 2)}\n\`\`\``,
    });

    const outputText =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "출력 형식을 확인하세요.";

    res.status(200).json({ result: outputText });
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/tag_priority", async (req, res) => {
  try {
    const input_json = await getExternalData();

    if (!input_json || input_json.length === 0) {
      return res.status(400).json({ error: "입력 일정 데이터가 비어있습니다." });
    }

    const response = await client.responses.create({
      model: "gpt-5-nano",
      reasoning: { effort: "low" },
      instructions: 
    //   프롬프트 다시 봐야함
    `
너는 json안의 tags의 중요도를 1~5로 평가하는 AI야.
중요도 5가 가장 중요하고, 중요도 1이 가장 중요하지 않아.
입력은 JSON 배열 형태의 특이사항들이고, json안에 tags 필드가 있어, 이 값을 보고 
각 json에 "priority" 필드를 추가해서 JSON 배열로 그대로 반환해줘.


      `,
      input: `다음 tags들의 중요도를 1~5로 판별:\n\`\`\`json\n${JSON.stringify(input_json, null, 2)}\n\`\`\``,
    });

    const outputText =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "출력 형식을 확인하세요.";

    res.status(200).json({ result: outputText });
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    res.status(500).json({ error: error.message });
  }
});
