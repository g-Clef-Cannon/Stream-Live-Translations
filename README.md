# Stream-Live-Translations

Semi-easy to set up live translation overlay for streaming

Demo Video:
https://www.youtube.com/watch?v=O3A8UOTHyxI

Prereqs:
  1. Modern version of chrome browser (we are using the integrated speech to text that is built in, of decent quality, and most importantly, free)
  2. Azure account, with a translate resource set up in cognitive services. (ask chat gpt to help you do this if need be)

Initial setup:
  1. open translate.js and fill in region and your azure translate api key
  2. run the run-translation-service.bat, which will start a local web server running the page we are using to do the speech to text and that sends off the translations, and then shows them
  3. once chrome is open, it will ask permission to use your audio input device- make sure chrome is set in the chrome settings to use the right one!
  4. at this point, everything should be running- chrome will display anything you say and then send it off to be translated once it thinks you are done with the current sentance.
  ![image](https://github.com/g-Clef-Cannon/Stream-Live-Translations/assets/137208498/f17c2b40-1452-4f7e-9d47-e4ce93202b65)
  5. the final step is to capture the browser window and chroma key the green out (so it's just the text remaining) as well as cropping out the browser borders. I do this with OBS but your steps may vary!
![image](https://github.com/g-Clef-Cannon/Stream-Live-Translations/assets/137208498/c5efbe3b-9ec7-45d4-ba0d-6e2d434f5eba)
![image](https://github.com/g-Clef-Cannon/Stream-Live-Translations/assets/137208498/ed0302aa-5bbe-4de1-bcb1-92c4e0bd6232)


Currently, this supports only jp -> en and en -> jp translations, you can press L to switch between translating japanese to english and vice versa. (JP -> EN is the default).

If you want to translate to or from other languages, all you need to do is mess with the languages you see in the translate.js file.
