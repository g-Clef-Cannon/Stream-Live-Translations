# Stream-Live-Translations

Semi-easy to set up live translation overlay for streaming

Prereqs:
  1. Modern version of chrome browser (we are using the integrated speech to text that is built in, of decent quality, and most importantly, free)
  2. Azure account, with a translate resource set up in cognitive services. (ask chat gpt to help you do this if need be)

Initial setup:
  1. open translate.js and fill in region and your azure translate api key
  2. run the run-translation-service.bat, which will start a local web server running the page we are using to do the speech to text and that sends off the translations, and then shows them
  3. once chrome is open, it will ask permission to use your audio input device- make sure chrome is set in the chrome settings to use the right one!
  4. at this point, everything should be running- chrome will display anything you say and then send it off to be translated once it thinks you are done with the current sentance.
  5. the final step is to capture the browser window and chroma key the green out (so it's just the text remaining) as well as cropping out the browser borders. I do this with OBS but your steps may vary!


Currently, this supports only jp -> en and en -> jp translations, you can press L to switch between translating japanese to english and vice versa. (JP -> EN is the default).

If you want to translate to or from other languages, all you need to do is mess with the languages you see in the translate.js file.
