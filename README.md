# ngHTMLed v 0.1 intial release

An Efficient i18n translation library for Angular JS framework

## Source

Download [prodution](https://github.com/nirus/ngHTMLed/blob/master/app/dist/nghtmled.js) unminified.

## Install via Bower

Command: `bower install ngHtmled`

## Directive API usage: Refer **main.html**.

- `<strings text-id="TEXT_ID">DEFAULT_TEXT_HERE</strings>` 
   **DEFAULT_TEXT_HERE** is rendered when a valid **text-id** is not available in properties file.
   
- `<strings format>%txt{"ID_1"} and %txt{"ID_2"}</strings>`
    **format** flag in the directive instructs the compiler service that the rendering string is dependent on more than one key from the properties file.
    Used to construct a sentence with more than one key in the string.
    
- `<strings text-id="TEXT_ID"></strings>` **<string>** is replaced by the string from properties file pointed by **TEXT_ID**

## Config API usage: Refer **app.js**

- `.properties` file should be a valid JSON file. Validate using [jsonviewer](https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&sqi=2&ved=0ahUKEwi1psOrpf_LAhUTCo4KHdjqDc4QFggbMAA&url=http%3A%2F%2Fjsonviewer.stack.hu%2F&usg=AFQjCNHJDRSyTyJVSkQj5iOdT6arjm1-fQ&bvm=bv.118817766,d.c2E) online. 
- autoDetect - (Type: Boolean) : 

     - **True**: It is used to detect the browser specific language settings. If you set it as true, it get's the browser language settings and automatically load it for you. Here is the catch when set as "true" - You should have the ".properties" file name exactly matching the name of the browser language returned. You can use this JSfiddle [Link](http://jsfiddle.net/nirus/9FVTf/) to get or see the language name set for the browser. For example if it returns "en-US" your ".properties" file for that specific language should be named as "en-US.properties". The framework will load it automatically and display the page in that language as specified.

     - **False**: If you want to explicitly load the language irrespective of your browser settings, then make "autoDetect" to "false" in the Global variable. This will load the language file given in "langPref". Just mention as "langPref: en-US", this load "en-US.properties" file.
 
- `langBundle` : Location or folder name of your properties file residing in.
- `langPref` :  Valid only when `autoDetect` is false. Read the **False** section under `autoDetect`.


--------
### Issue's tracking and questionaire

Please feel free to log the issues on github or ask a stackoverflow question and [mail](mailto:nirus@live.in) the link to me.

## To run the sample app

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

### Project base
This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.