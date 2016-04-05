"use strict";

describe("ngHTMLed library test", function() {
    var provider, httpBackend, element,rootScope,compile,
        tags = [
            "<string text-id='no-id'>Simple text</string>",
            "<string text-id='test'>Simple text</string>",
            "<string format>%txt{'test2'} for %txt{'string1'}</string>"
        ], i = 0;


    beforeEach(module("ngHTMLed"))    
    beforeEach(function() {        
        module(function($HTMLedProvider) {
            provider = $HTMLedProvider;
            provider.setup({
                langBundle: "properties",
                autoDetect: false,
                langPref: "en-US"
            });
        });
        
        beforeEach(module("ng"));
        inject(function($httpBackend, $rootScope, $compile) {
            httpBackend = $httpBackend;                                                    
            httpBackend.when("POST","properties/en-US.properties")
            .respond(200, {
                "test": "Simple text example",
                "test2": "example",
                "string1": "Just plain string",
                "string2": "Format string option"
            });
                 
           rootScope = $rootScope;
           var scope = rootScope.$new();
           compile = $compile;  
           element = compile("<div>" + tags[i] + "</div>")(scope);                   
        })
    });

    it("compile to default string as 'text-id' is not valid, not defined in properties file", function() {        
        var scope = rootScope.$new();
        //element = compile("<div>" + tags[i] + "</div>")(scope);        
        scope.$digest();        
        var txt = angular.element(element)
        expect(txt.text()).toEqual("Simple text");
        i++;
    });
    
    it("render the text 'text-id' which is valid and defined in .properties file", function() {                              
        scope.$digest();        
        var txt = angular.element(element)
        expect(txt.text()).toEqual("Simple text example");
        i++;
    });
    
   /* it("render the formatted string combining two phrases or key from .properties file ", function() {        
        var scope = rootScope.$new();
        element = compile("<div>" + tags[i] + "</div>")(scope);
        scope.$digest();        
        var txt = angular.element(element)
        expect(txt.text()).toEqual("example for Just plain string");
        i++;
    });  */      
})


