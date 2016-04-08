/*         ngHTMLed.js  ver 0.1
 * library written by Niranjan Kumar - A.K.A - N!Ru$
 * this library requires Angular JS to be loaded as a dependency module
 * at Config stage setup your language configurtion
 * Your ".properties" file should be in JSON format.
 * Your ".properties" file name should be exactly the browser returned language. 
 * goto http://jsfiddle.net/nirus/9FVTf/ to get the file name you want to set based on your browser eg: en-US.properties for english US language
 * contact me for any queries : nirus@live.in
 */

//: Minify Task `grunt build-lib`

angular.module('ngHTMLed', ['ng'])
    .provider("$HTMLed", ["$httpProvider", function($httpProvider) {
        /**
        *  Global object that will be exposed
        */
        var _promise, htmled = {
            json: {},
            config: {}
        },
            intercept = ["$q", "$templateCache", function($q, $templateCache) {
                return {
                    "response": function(response) {
                        if (Object.getOwnPropertyNames(htmled.json).length === 0) {
                            return $q(function(resolve, reject) {
                                _promise
                                    .then(function(resp) {
                                        htmled.json = resp.data;
                                        resolve(response);
                                    })
                                    .catch(function(err) {
                                        console.error("ngHTMLed Reports: \n\tCode:" + err.status + "\n\tMessage: Error with Properties file " + err.statusText);
                                        reject(response);
                                    });
                            });
                        }
                        //Default return value
                        return response;
                    }
                }
            }];

        //Add the interceptor
        $httpProvider.interceptors.push(intercept);

        this.setup = function(opt) {
            var $http = angular.injector(['ng']).get('$http');
            if (!opt.langBundle) {
                console.error("ngHTMLed: Please specify your bundle folder.");
                return;
            }

            if (opt.autoDetect) {
                htmled.config = {
                    properties: opt.langBundle.toString() + '/' + (window.navigator.language || navigator.language || navigator.userLanguage).toString() + '.properties',
                    language: (window.navigator.language || navigator.language || navigator.userLanguage).toString()
                }

            } else if (opt.langPref) {
                htmled.config = {
                    properties: opt.langBundle.toString() + '/' + opt.langPref + '.properties',
                    language: opt.langPref
                }
            } else {
                console.error("ngHTMLed: Please specify langPref in your configuration object.")
                return;
            }

            _promise = $http.get(htmled.config.properties, { responseType: "json" })
        }
        
        //Provider inteface
        this.$get = function() {
            return {
                configuration: function() {
                    return htmled.config;
                },
                bundle: function() {
                    return htmled.json;
                }
            };
        }
    }])

    .directive("strings", ["$compile", "$HTMLed", function($compile, $HTMLed) {
        return {
            retrict: 'E',
            link: function(scope, $el, attr) {
                var $parent = $el.parent(), bundle = $HTMLed.bundle();

                /**
                 * formats the string that supports format attribute
                 * @param  {String} str
                 * @return  {String} str
                 */
                function format(str) {
                    var txt = str.match(new RegExp(/%txt{([^}]+)}/g));
                    txt.forEach(function(el, index, arr) {                        
                        var key = (el.match("\{'(.*?)'\}") || el.match("\{\"(.*?)\"\}")).pop(), re = new RegExp(el, "gi");
                        if (!bundle[key]) {
                            console.error(key + " is missing from your properties file. Will be resolved as undefined!");
                        } else {
                            str = str.replace(re, bundle[key]);
                        }
                    });

                    return str;
                };

                $parent.children().remove();
                if (bundle[attr.textId]) {
                    $compile($parent.text(bundle[attr.textId]))(scope);
                } else if (!attr.hasOwnProperty("format")) {
                    if (!!$el.text()) {
                        $compile($parent.text($el.text()))(scope);
                    } else {
                        console.error("Please check the text-id mapping. No matching found in properties for: " + attr.textId);
                    }
                } else {
                    $compile($parent.text(format($el.text())))(scope);
                }
            }
        }
    }]);
