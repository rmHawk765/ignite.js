export function formatCommandName(
  baseCommandName: string,
  subcommandGroupName?: string,
  subcommandName?: string
) {
  if (!subcommandGroupName && !subcommandName) return baseCommandName;
  if (subcommandGroupName && !subcommandName)
    return `${baseCommandName}/${subcommandGroupName}`;
  if (subcommandGroupName && subcommandName)
    return `${baseCommandName}/${subcommandGroupName}/${subcommandName}`;
}
