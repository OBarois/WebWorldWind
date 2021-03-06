/*
 * Copyright 2015-2017 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    'src/util/XmlDocument',
    'src/formats/kml/styles/KmlLineStyle'
], function (
    XmlDocument,
    KmlLineStyle
) {
    "use strict";
    describe("KmlLineStyle", function(){

    var validKml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        "<kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\">" +
        "<LineStyle id=\"1\">" +
        "   <color>ffffffff</color>" +
        "   <colorMode>normal</colorMode>" +
        "   " +
        "   <width>1</width>" +
        "   <gx:outerColor>ffffffff</gx:outerColor>" +
        "   <gx:outerWidth>0.5</gx:outerWidth>" +
        "   <gx:physicalWidth>0.4</gx:physicalWidth>" +
        "   <gx:labelVisibility>0</gx:labelVisibility>" +
        "</LineStyle>" +
        "</kml>";

            var kmlRepresentation = new XmlDocument(validKml).dom();
            var lineStyle = new KmlLineStyle({objectNode:
                kmlRepresentation.getElementsByTagName("LineStyle")[0]});

            it("should have the Width, OuterColor, OuterWidth, PhysicalWidth and LabelVisibility properties", function(){
            expect(lineStyle.kmlWidth).toEqual(1);
            expect(lineStyle.kmlOuterColor).toEqual('ffffffff');
            expect(lineStyle.kmlOuterWidth).toEqual(0.5);
            expect(lineStyle.kmlPhysicalWidth).toEqual(0.4);
            expect(lineStyle.kmlLabelVisibility).toEqual(false);

        });


    });
});