figma.showUI(__html__);

async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
) {
  const data = {
    text: [text],
    sourceLang: sourceLanguage,
    targetLang: targetLanguage,
  };

  const options: FetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const serverUrl = ''
    const response = await fetch(
      serverUrl,
      options
    );

    // @ts-ignore
    if ("json" in response) {
      const responseData = await response.json();
      return responseData.data?.[0] ?? "";
    }
  } catch (e) {
    figma.notify("번역에 실패했습니다. 다시 시도해주세요.");
    console.log(e);
  }

  return null;
}

// Figma 플러그인 UI에서 발생하는 이벤트 처리
figma.ui.onmessage = async (msg) => {
  if (msg.type === "translate") {
    const selectedLayers = figma.currentPage.selection;

    if (selectedLayers.length > 0 && selectedLayers[0].type === "TEXT") {
      const textNode = selectedLayers[0] as TextNode;
      const originalText = textNode.characters;

      figma.ui.postMessage({
        originalText,
        isLoading: true,
      });

      const translatedText = await translateText(
        originalText,
        msg.source,
        msg.target
      );

      figma.ui.postMessage({
        translatedText,
        isLoading: false,
      });
    }
  }
};
