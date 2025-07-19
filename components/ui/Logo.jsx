export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/raiduix_logo_transparent_bg.PNG"
        alt="RAIDUIX Logo"
        className="h-8 w-8 object-contain drop-shadow-lg"
        style={{ background: "transparent" }}
      />
      <span className="font-bold text-lg">RAIDUIX</span>
    </div>
  );
}
