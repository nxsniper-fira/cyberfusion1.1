FROM mcr.microsoft.com/dotnet/sdk:6.0
RUN apt-get update && apt-get install -y git
RUN git clone --recurse-submodules https://github.com/cobbr/Covenant /opt/covenant
WORKDIR /opt/covenant/Covenant
RUN dotnet build
EXPOSE 7443
ENTRYPOINT ["dotnet", "Covenant.dll"]