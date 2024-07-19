export function validateExtensionFromFramework({ framework, ext }) {
  const extensionFromFramework =
    {
      "React": ext + "x",
    } || ext;

  return extensionFromFramework[framework] || ext;
}
