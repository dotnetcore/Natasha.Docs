rm "i18n/zh-Hans/docusaurus-plugin-content-docs/current" -Recurse
mkdir "i18n/zh-Hans/docusaurus-plugin-content-docs/current"
cp -r docs/** "i18n/zh-Hans/docusaurus-plugin-content-docs/current"

# rm "i18n/zh-Hans/docusaurus-plugin-content-blog" -Recurse
# mkdir "i18n/zh-Hans/docusaurus-plugin-content-blog"
# cp -r blog/** "i18n/zh-Hans/docusaurus-plugin-content-blog"


Get-ChildItem versioned_docs | ForEach-Object {
    rm "i18n/zh-Hans/docusaurus-plugin-content-docs/$($_.Name)" -Recurse
    mkdir "i18n/zh-Hans/docusaurus-plugin-content-docs/$($_.Name)"
    cp -r versioned_docs/$($_.Name)/** "i18n/zh-Hans/docusaurus-plugin-content-docs/$($_.Name)"  -Force
}
