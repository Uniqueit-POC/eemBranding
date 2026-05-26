$files = Get-ChildItem -Path 'g:/xampp/htdocs/EmmBrandingnew' -Recurse -Filter *.html
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    # Remove .html extension from href values
    $content = $content -replace 'href="([^"]+?)\.html"', 'href="$1"'
    # Specific replacement for creative‑design link
    $content = $content -replace 'href="creative-design\.html"', 'href="services/creative-design-agency-in-ahmedabad"'
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
