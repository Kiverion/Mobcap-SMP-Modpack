// =======RUNTIME GENERATED DEFINE SECTION========
#version 150 core

#define farFogStart 0.0
#define farFogLength 0.0
#define farFogMin 0.0
#define farFogRange 0.0
#define farFogDensity 0.0
#define heightFogStart 0.0
#define heightFogLength 0.0
#define heightFogMin 0.0
#define heightFogRange 0.0
#define heightFogDensity 0.0

// =======RUNTIME END========

in vec4 vertexColor;
in vec3 vertexWorldPos;
in float vertexYPos;

out vec4 fragColor;

uniform float fogScale;
uniform float fogVerticalScale;
uniform float nearFogStart;
uniform float nearFogLength;
uniform int fullFogMode;

/* ========MARCO DEFINED BY RUNTIME CODE GEN=========

float farFogStart;
float farFogLength;
float farFogMin;
float farFogRange;
float farFogDensity;

float heightFogStart;
float heightFogLength;
float heightFogMin;
float heightFogRange;
float heightFogDensity;
*/

uniform vec4 fogColor;

// method definitions
// ==== The below 5 methods will be run-time generated. ====
float getNearFogThickness(float dist);
float getFarFogThickness(float dist);
float getHeightFogThickness(float dist);
float calculateFarFogDepth(float horizontal, float dist);
float calculateHeightFogDepth(float vertical, float realY);
float mixFogThickness(float near, float far, float height);
// =========================================================

/** 
 * Fragment Shader
 * 
 * author: James Seibel
 * version: 11-26-2021
 */
void main()
{
	vec4 returnColor;
    if (fullFogMode != 0) {
        returnColor = vec4(fogColor.rgb, 1.0);
    } else {
        // TODO: add a white texture to support Optifine shaders
        //vec4 textureColor = texture(texImage, textureCoord);
        //fragColor = vertexColor * textureColor;

        float horizontalDist = length(vertexWorldPos.xz) * fogScale;
        float heightDist = calculateHeightFogDepth(
            vertexWorldPos.y, vertexYPos) * fogVerticalScale;
        float farDist = calculateFarFogDepth(horizontalDist,
            length(vertexWorldPos.xyz) * fogScale);

        float nearFogThickness = getNearFogThickness(horizontalDist);
        float farFogThickness = getFarFogThickness(farDist);
        float heightFogThickness = getHeightFogThickness(heightDist);
        float mixedFogThickness = clamp(mixFogThickness(
            nearFogThickness, farFogThickness, heightFogThickness), 0.0, 1.0);

        returnColor = mix(vertexColor, vec4(fogColor.rgb, 1.0), mixedFogThickness);

	}
    //fragColor = vec4(0.7,0.6,0.5,1.0);
	fragColor = vec4(returnColor.rgb,1.0);
}

float linearFog(float x, float fogStart, float fogLength, float fogMin, float fogRange) {
    x = clamp((x-fogStart)/fogLength, 0.0, 1.0);
    return fogMin + fogRange * x;
}

float exponentialFog(float x, float fogStart, float fogLength,
    float fogMin, float fogRange, float fogDensity) {
    x = max((x-fogStart)/fogLength, 0.0) * fogDensity;
    return fogMin + fogRange - fogRange/exp(x);
}

float exponentialSquaredFog(float x, float fogStart, float fogLength,
    float fogMin, float fogRange, float fogDensity) {
    x = max((x-fogStart)/fogLength, 0.0) * fogDensity;
    return fogMin + fogRange - fogRange/exp(x*x);
}
// =======RUNTIME GENERATED CODE SECTION========

float getNearFogThickness(float dist) {return 0.0;}


float getFarFogThickness(float dist) { return 0.0; }
float getHeightFogThickness(float dist) { return 0.0; }
float calculateFarFogDepth(float horizontal, float dist) { return 0.0; }
float calculateHeightFogDepth(float vertical, float realY) { return 0.0; }
float mixFogThickness(float near, float far, float height) { return near; }

