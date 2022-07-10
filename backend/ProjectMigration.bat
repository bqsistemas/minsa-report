@echo off
SET /P name= Migration Name:

set ASPNETCORE_ENVIRONMENT=Development

dotnet ef migrations add %name% --project Devsu.BackendBP.Infraestructure --startup-project Devsu.BackendBP.ExamAPI --context BackendBPDbContext -o Migrations

set /p DUMMY=Press any key to finalize...