$htmlFiles = Get-ChildItem -Path 'g:/xampp/htdocs/EmmBrandingnew' -Recurse -Filter *.html
$htaccess = 'g:/xampp/htdocs/EmmBrandingnew/.htaccess'
$rules = @()
foreach ($file in $htmlFiles) {
    # Get relative path from project root, remove .html extension
    $relative = $file.FullName.Substring('g:/xampp/htdocs/EmmBrandingnew/'.Length)
    $relative = $relative -replace '\\', '/' # normalize slashes
    $name = $relative -replace '\.html$', ''
    # Skip index.html as it's already handled
    if ($name -ieq 'index') { continue }
    $rules += "RewriteRule ^$name$ $name.html [L,NC]"
}
# Insert rules before the generic rewrite block (search for marker comment or add if not present)
$htContents = Get-Content $htaccess -Raw
$marker = "# BEGIN AUTO GENERATED PAGE REWRITES"
if ($htContents -notmatch $marker) {
    $newContent = $marker + "`n" + ($rules -join "`n") + "`n# END AUTO GENERATED PAGE REWRITES`n" + $htContents
    Set-Content -Path $htaccess -Value $newContent -Encoding UTF8
} else {
    # Replace between markers
    $pattern = "(?s)# BEGIN AUTO GENERATED PAGE REWRITES.*?# END AUTO GENERATED PAGE REWRITES"
    $replacement = $marker + "`n" + ($rules -join "`n") + "`n# END AUTO GENERATED PAGE REWRITES"
    $newContent = [regex]::Replace($htContents, $pattern, $replacement)
    Set-Content -Path $htaccess -Value $newContent -Encoding UTF8
}
Write-Host "Rewrite rules updated for" $rules.Count "pages."
