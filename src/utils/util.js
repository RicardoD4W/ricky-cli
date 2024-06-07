export function toPascalCase(input) {
    return input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

export function toNormalize(input) {
    return input.replace(/\s+/g, '-');

}