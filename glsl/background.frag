precision mediump float;
uniform vec2 u_resolution;
uniform uint u_seed1;
uniform uint u_seed2;
uniform uint u_seed3;
uniform float u_time1;
uniform float u_time2;
uniform float u_time3;
uniform float u_min1;
uniform float u_min2;
uniform float u_min3;
uniform float u_max1;
uniform float u_max2;
uniform float u_max3;
uniform float u_scale1;
uniform float u_scale2;
uniform float u_scale3;

uint hash(uint x, uint seed) {
	const uint m = 0x5bd1e995U;
	uint hash = seed;
    // process input
	uint k = x;
	k *= m;
	k ^= k >> 24;
	k *= m;
	hash *= m;
	hash ^= k;
    // some final mixing
	hash ^= hash >> 13;
	hash *= m;
	hash ^= hash >> 15;
	return hash;
}

// implementation of MurmurHash (https://sites.google.com/site/murmurhash/) for a  
// 3-dimensional unsigned integer input vector.

uint hash(uvec3 x, uint seed) {
	const uint m = 0x5bd1e995U;
	uint hash = seed;
    // process first vector element
	uint k = x.x;
	k *= m;
	k ^= k >> 24;
	k *= m;
	hash *= m;
	hash ^= k;
    // process second vector element
	k = x.y;
	k *= m;
	k ^= k >> 24;
	k *= m;
	hash *= m;
	hash ^= k;
    // process third vector element
	k = x.z;
	k *= m;
	k ^= k >> 24;
	k *= m;
	hash *= m;
	hash ^= k;
	// some final mixing
	hash ^= hash >> 13;
	hash *= m;
	hash ^= hash >> 15;
	return hash;
}

vec3 gradientDirection(uint hash) {
	switch(int(hash) & 15) { // look at the last four bits to pick a gradient direction
		case 0:
			return vec3(1, 1, 0);
		case 1:
			return vec3(-1, 1, 0);
		case 2:
			return vec3(1, -1, 0);
		case 3:
			return vec3(-1, -1, 0);
		case 4:
			return vec3(1, 0, 1);
		case 5:
			return vec3(-1, 0, 1);
		case 6:
			return vec3(1, 0, -1);
		case 7:
			return vec3(-1, 0, -1);
		case 8:
			return vec3(0, 1, 1);
		case 9:
			return vec3(0, -1, 1);
		case 10:
			return vec3(0, 1, -1);
		case 11:
			return vec3(0, -1, -1);
		case 12:
			return vec3(1, 1, 0);
		case 13:
			return vec3(-1, 1, 0);
		case 14:
			return vec3(0, -1, 1);
		case 15:
			return vec3(0, -1, -1);
	}
}

float interpolate(float value1, float value2, float value3, float value4, float value5, float value6, float value7, float value8, vec3 t) {
	return mix(mix(mix(value1, value2, t.x), mix(value3, value4, t.x), t.y), mix(mix(value5, value6, t.x), mix(value7, value8, t.x), t.y), t.z);
}

vec3 fade(vec3 t) {
    // 6t^5 - 15t^4 + 10t^3
	return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float perlinNoise(vec3 position, uint seed) {
	vec3 floorPosition = floor(position);
	vec3 fractPosition = position - floorPosition;
	uvec3 cellCoordinates = uvec3(floorPosition);
	float value1 = dot(gradientDirection(hash(cellCoordinates, seed)), fractPosition);
	float value2 = dot(gradientDirection(hash((cellCoordinates + uvec3(1, 0, 0)), seed)), fractPosition - vec3(1, 0, 0));
	float value3 = dot(gradientDirection(hash((cellCoordinates + uvec3(0, 1, 0)), seed)), fractPosition - vec3(0, 1, 0));
	float value4 = dot(gradientDirection(hash((cellCoordinates + uvec3(1, 1, 0)), seed)), fractPosition - vec3(1, 1, 0));
	float value5 = dot(gradientDirection(hash((cellCoordinates + uvec3(0, 0, 1)), seed)), fractPosition - vec3(0, 0, 1));
	float value6 = dot(gradientDirection(hash((cellCoordinates + uvec3(1, 0, 1)), seed)), fractPosition - vec3(1, 0, 1));
	float value7 = dot(gradientDirection(hash((cellCoordinates + uvec3(0, 1, 1)), seed)), fractPosition - vec3(0, 1, 1));
	float value8 = dot(gradientDirection(hash((cellCoordinates + uvec3(1, 1, 1)), seed)), fractPosition - vec3(1, 1, 1));
	return interpolate(value1, value2, value3, value4, value5, value6, value7, value8, fade(fractPosition));
}

float perlinNoise(vec3 position, int frequency, int octaveCount, float persistence, float lacunarity, uint seed) {
	float value = 0.0;
	float amplitude = 1.0;
	float currentFrequency = float(frequency);
	uint currentSeed = seed;
	for(int i = 0; i < octaveCount; i++) {
		currentSeed = hash(currentSeed, 0x0U); // create a new seed for each octave
		value += perlinNoise(position * currentFrequency, currentSeed) * amplitude;
		amplitude *= persistence;
		currentFrequency *= lacunarity;
	}
	return value;
}

float map(float value, float min1, float max1, float min2, float max2) {
	return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
	vec2 position = gl_FragCoord.xy / u_resolution;
	position.x *= u_resolution.x / u_resolution.y;

	float value1 = (perlinNoise(vec3(position * u_scale1, u_time1), 1, 2, 1.0, 3.0, u_seed1) + 1.0) * 0.5;
	float value2 = (perlinNoise(vec3(position * u_scale2, u_time2), 1, 2, 1.0, 3.0, u_seed2) + 1.0) * 0.5;
	float value3 = (perlinNoise(vec3(position * u_scale3, u_time3), 1, 2, 1.0, 3.0, u_seed3) + 1.0) * 0.5;

	value1 = map(value1, 0.0, 1.0, u_min1 * 0.01, u_max1 * 0.01);
	value2 = map(value2, 0.0, 1.0, u_min2 * 0.01, u_max2 * 0.01);
	value3 = map(value3, 0.0, 1.0, u_min3 * 0.01, u_max3 * 0.01);
	
	gl_FragColor = vec4(value1, value2, value3, 01.0);
}