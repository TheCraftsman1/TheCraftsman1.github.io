$c = Get-Content -Raw "components/FrostedGlassBackground.tsx"

$mobileAdjuster = "
const MobileAdjuster = () => {
  const { viewport, camera } = useThree();
  useFrame(() => {
    // If aspect ratio is portrait (mobile), widen the FOV so rings don't squash text
    const isMobile = viewport.aspect < 1;
    const targetFov = isMobile ? 55 : 35;
    camera.fov = THREE.MathUtils.lerp((camera as THREE.PerspectiveCamera).fov, targetFov, 0.1);
    camera.updateProjectionMatrix();
  });
  return null;
};
"

# Inject MobileAdjuster component
$c = $c -replace "export const FrostedGlassBackground", "$mobileAdjuster`nexport const FrostedGlassBackground"
$c = $c -replace "\<InfiniteLoop \/\>", "<InfiniteLoop />`n        <MobileAdjuster />"
$c = $c -replace "import { Canvas, useFrame", "import { Canvas, useFrame, useThree"
Set-Content -Path "components/FrostedGlassBackground.tsx" -Value $c
