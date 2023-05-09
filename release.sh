cd "$(dirname $0)" # Change directory to the script's directory
version=$(grep -oP '(?<="version": ")[^"]+' theme.json) # Get version from theme.json
git tag v$version # Create a tag
git push origin --tags # Push the tag to GitHub
# git archive --format zip --output ../package-$version.zip HEAD # Create a zip archive
