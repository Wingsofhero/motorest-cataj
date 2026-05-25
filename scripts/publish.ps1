param(
  [Parameter(Mandatory = $true)]
  [string]$Message
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is not installed or not available in PATH."
}

$remote = git remote get-url origin 2>$null
if (-not $remote) {
  throw "No GitHub remote is configured. Run: git remote add origin <YOUR_GITHUB_REPO_URL>"
}

git add .

$status = git status --short
if (-not $status) {
  Write-Host "Nothing to publish."
  exit 0
}

git commit -m $Message
git push

Write-Host "Published. Vercel should start a new deployment automatically."
