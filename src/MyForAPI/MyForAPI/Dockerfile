FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 8100

COPY . .

ENTRYPOINT ["dotnet", "MyForAPI.dll"]