
## Top-level --help
```
$ calm-hub-cli --help
Usage: calm-hub-cli [options] [command]

CLI for issuing requests to a calm-hub server.

Options:
  --base-url <url>  Base URL for calm-hub. (default: "http://localhost:8080")
  --out <path>      Write rendered output to a file.
  --timeout <ms>    Request timeout in milliseconds. (default: "30000")
  --verbose         Print request details to stderr. (default: false)
  -h, --help        display help for command

Commands:
  namespaces        Manage calm-hub namespaces.
  domains           Manage calm-hub domains.
  architectures     Manage calm-hub architectures.
  adrs              Manage calm-hub ADRs.
  decorators        Manage calm-hub decorators.
  controls          Manage calm-hub controls.
  patterns          Manage calm-hub patterns.
  interfaces        Manage calm-hub interfaces.
  standards         Manage calm-hub standards.
  flows             Manage calm-hub flows.
  help [command]    display help for command
```

## namespaces --help
```
$ calm-hub-cli namespaces --help
Usage: calm-hub-cli namespaces [options] [command]

Manage calm-hub namespaces.

Options:
  -h, --help        display help for command

Commands:
  list              List namespaces.
  create [options]  Create a namespace from flags or a JSON file.
  help [command]    display help for command
```
```
$ calm-hub-cli namespaces list --help
Usage: calm-hub-cli namespaces list [options]

List namespaces.

Options:
  -h, --help  display help for command
```
```
$ calm-hub-cli namespaces create --help
Usage: calm-hub-cli namespaces create [options]

Create a namespace from flags or a JSON file.

Options:
  --file <path>                Path to a namespace JSON file.
  --name <name>                Namespace name.
  --description <description>  Namespace description.
  -h, --help                   display help for command
```

## domains --help
```
$ calm-hub-cli domains --help
Usage: calm-hub-cli domains [options] [command]

Manage calm-hub domains.

Options:
  -h, --help        display help for command

Commands:
  list              List domains.
  create [options]  Create a domain.
  help [command]    display help for command
```
```
$ calm-hub-cli domains list --help
Usage: calm-hub-cli domains list [options]

List domains.

Options:
  -h, --help  display help for command
```
```
$ calm-hub-cli domains create --help
Usage: calm-hub-cli domains create [options]

Create a domain.

Options:
  --name <name>  Domain name.
  -h, --help     display help for command
```

## architectures --help
```
$ calm-hub-cli architectures --help
Usage: calm-hub-cli architectures [options] [command]

Manage calm-hub architectures.

Options:
  -h, --help                display help for command

Commands:
  list [options]            List architecture summaries for a namespace.
  create [options]          Create a new architecture in a namespace from a JSON
                            file.
  versions [options]        List versions for a architecture.
  get [options]             Get a specific architecture version.
  create-version [options]  Create a new version for an existing architecture.
  help [command]            display help for command
```
```
$ calm-hub-cli architectures list --help
Usage: calm-hub-cli architectures list [options]

List architecture summaries for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  -h, --help               display help for command
```
```
$ calm-hub-cli architectures create --help
Usage: calm-hub-cli architectures create [options]

Create a new architecture in a namespace from a JSON file.

Options:
  --namespace <namespace>      Namespace name.
  --file <path>                Path to a architecture JSON file.
  --name <name>                Override the architecture name.
  --description <description>  Override the architecture description.
  -h, --help                   display help for command
```
```
$ calm-hub-cli architectures versions --help
Usage: calm-hub-cli architectures versions [options]

List versions for a architecture.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Architecture id.
  -h, --help               display help for command
```
```
$ calm-hub-cli architectures get --help
Usage: calm-hub-cli architectures get [options]

Get a specific architecture version.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Architecture id.
  --version <version>      Architecture version.
  -h, --help               display help for command
```
```
$ calm-hub-cli architectures create-version --help
Usage: calm-hub-cli architectures create-version [options]

Create a new version for an existing architecture.

Options:
  --namespace <namespace>      Namespace name.
  --id <id>                    Architecture id.
  --version <version>          Version to create.
  --file <path>                Path to a architecture JSON file.
  --name <name>                Override the architecture name.
  --description <description>  Override the architecture description.
  -h, --help                   display help for command
```

## adrs --help
```
$ calm-hub-cli adrs --help
Usage: calm-hub-cli adrs [options] [command]

Manage calm-hub ADRs.

Options:
  -h, --help              display help for command

Commands:
  list [options]          List ADRs for a namespace.
  create [options]        Create an ADR from a JSON file.
  get [options]           Get the latest ADR revision.
  revisions [options]     List ADR revisions.
  get-revision [options]  Get a specific ADR revision.
  update [options]        Create a new ADR revision from a JSON file.
  status [options]        Create a new ADR revision with an updated status.
  help [command]          display help for command
```
```
$ calm-hub-cli adrs list --help
Usage: calm-hub-cli adrs list [options]

List ADRs for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  -h, --help               display help for command
```
```
$ calm-hub-cli adrs create --help
Usage: calm-hub-cli adrs create [options]

Create an ADR from a JSON file.

Options:
  --namespace <namespace>  Namespace name.
  --file <path>            ADR request file.
  -h, --help               display help for command
```
```
$ calm-hub-cli adrs get --help
Usage: calm-hub-cli adrs get [options]

Get the latest ADR revision.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                ADR id.
  -h, --help               display help for command
```
```
$ calm-hub-cli adrs revisions --help
Usage: calm-hub-cli adrs revisions [options]

List ADR revisions.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                ADR id.
  -h, --help               display help for command
```
```
$ calm-hub-cli adrs get-revision --help
Usage: calm-hub-cli adrs get-revision [options]

Get a specific ADR revision.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                ADR id.
  --revision <revision>    ADR revision.
  -h, --help               display help for command
```
```
$ calm-hub-cli adrs update --help
Usage: calm-hub-cli adrs update [options]

Create a new ADR revision from a JSON file.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                ADR id.
  --file <path>            ADR request file.
  -h, --help               display help for command
```
```
$ calm-hub-cli adrs status --help
Usage: calm-hub-cli adrs status [options]

Create a new ADR revision with an updated status.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                ADR id.
  --status <status>        ADR status.
  -h, --help               display help for command
```

## decorators --help
```
$ calm-hub-cli decorators --help
Usage: calm-hub-cli decorators [options] [command]

Manage calm-hub decorators.

Options:
  -h, --help        display help for command

Commands:
  list [options]    List decorator ids for a namespace.
  values [options]  List decorator values for a namespace.
  get [options]     Get a decorator by id.
  create [options]  Create a decorator from a JSON file.
  update [options]  Update a decorator from a JSON file.
  help [command]    display help for command
```
```
$ calm-hub-cli decorators list --help
Usage: calm-hub-cli decorators list [options]

List decorator ids for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  --target <target>        Optional target filter.
  --type <type>            Optional type filter.
  -h, --help               display help for command
```
```
$ calm-hub-cli decorators values --help
Usage: calm-hub-cli decorators values [options]

List decorator values for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  --target <target>        Optional target filter.
  --type <type>            Optional type filter.
  -h, --help               display help for command
```
```
$ calm-hub-cli decorators get --help
Usage: calm-hub-cli decorators get [options]

Get a decorator by id.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Decorator id.
  -h, --help               display help for command
```
```
$ calm-hub-cli decorators create --help
Usage: calm-hub-cli decorators create [options]

Create a decorator from a JSON file.

Options:
  --namespace <namespace>  Namespace name.
  --file <path>            Decorator JSON file.
  -h, --help               display help for command
```
```
$ calm-hub-cli decorators update --help
Usage: calm-hub-cli decorators update [options]

Update a decorator from a JSON file.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Decorator id.
  --file <path>            Decorator JSON file.
  -h, --help               display help for command
```

## controls --help
```
$ calm-hub-cli controls --help
Usage: calm-hub-cli controls [options] [command]

Manage calm-hub controls.

Options:
  -h, --help                              display help for command

Commands:
  list [options]                          List controls for a domain.
  create [options]                        Create a control requirement from a wrapped JSON file.
  requirement-versions [options]          List requirement versions for a control.
  requirement-get [options]               Get a control requirement version.
  requirement-create-version [options]    Create a new control requirement version from a raw JSON file.
  configurations [options]                List configuration ids for a control.
  configuration-create [options]          Create a control configuration from a wrapped JSON file.
  configuration-versions [options]        List configuration versions.
  configuration-get [options]             Get a specific configuration version.
  configuration-create-version [options]  Create a new control configuration version from a raw JSON file.
  help [command]                          display help for command
```
```
$ calm-hub-cli controls list --help
Usage: calm-hub-cli controls list [options]

List controls for a domain.

Options:
  --domain <domain>  Domain name.
  -h, --help         display help for command
```
```
$ calm-hub-cli controls create --help
Usage: calm-hub-cli controls create [options]

Create a control requirement from a wrapped JSON file.

Options:
  --domain <domain>  Domain name.
  --file <path>      Wrapped control requirement file.
  -h, --help         display help for command
```
```
$ calm-hub-cli controls requirement-versions --help
Usage: calm-hub-cli controls requirement-versions [options]

List requirement versions for a control.

Options:
  --domain <domain>  Domain name.
  --id <id>          Control id.
  -h, --help         display help for command
```
```
$ calm-hub-cli controls requirement-get --help
Usage: calm-hub-cli controls requirement-get [options]

Get a control requirement version.

Options:
  --domain <domain>    Domain name.
  --id <id>            Control id.
  --version <version>  Requirement version.
  -h, --help           display help for command
```
```
$ calm-hub-cli controls requirement-create-version --help
Usage: calm-hub-cli controls requirement-create-version [options]

Create a new control requirement version from a raw JSON file.

Options:
  --domain <domain>    Domain name.
  --id <id>            Control id.
  --version <version>  Requirement version.
  --file <path>        Raw requirement JSON file.
  -h, --help           display help for command
```
```
$ calm-hub-cli controls configurations --help
Usage: calm-hub-cli controls configurations [options]

List configuration ids for a control.

Options:
  --domain <domain>  Domain name.
  --id <id>          Control id.
  -h, --help         display help for command
```
```
$ calm-hub-cli controls configuration-create --help
Usage: calm-hub-cli controls configuration-create [options]

Create a control configuration from a wrapped JSON file.

Options:
  --domain <domain>  Domain name.
  --id <id>          Control id.
  --file <path>      Wrapped control configuration file.
  -h, --help         display help for command
```
```
$ calm-hub-cli controls configuration-versions --help
Usage: calm-hub-cli controls configuration-versions [options]

List configuration versions.

Options:
  --domain <domain>       Domain name.
  --id <id>               Control id.
  --config-id <configId>  Configuration id.
  -h, --help              display help for command
```
```
$ calm-hub-cli controls configuration-get --help
Usage: calm-hub-cli controls configuration-get [options]

Get a specific configuration version.

Options:
  --domain <domain>       Domain name.
  --id <id>               Control id.
  --config-id <configId>  Configuration id.
  --version <version>     Configuration version.
  -h, --help              display help for command
```
```
$ calm-hub-cli controls configuration-create-version --help
Usage: calm-hub-cli controls configuration-create-version [options]

Create a new control configuration version from a raw JSON file.

Options:
  --domain <domain>       Domain name.
  --id <id>               Control id.
  --config-id <configId>  Configuration id.
  --version <version>     Configuration version.
  --file <path>           Raw configuration JSON file.
  -h, --help              display help for command
```

## patterns --help
```
$ calm-hub-cli patterns --help
Usage: calm-hub-cli patterns [options] [command]

Manage calm-hub patterns.

Options:
  -h, --help                display help for command

Commands:
  list [options]            List pattern summaries for a namespace.
  create [options]          Create a new pattern in a namespace from a JSON
                            file.
  versions [options]        List versions for a pattern.
  get [options]             Get a specific pattern version.
  create-version [options]  Create a new version for an existing pattern.
  help [command]            display help for command
```
```
$ calm-hub-cli patterns list --help
Usage: calm-hub-cli patterns list [options]

List pattern summaries for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  -h, --help               display help for command
```
```
$ calm-hub-cli patterns create --help
Usage: calm-hub-cli patterns create [options]

Create a new pattern in a namespace from a JSON file.

Options:
  --namespace <namespace>      Namespace name.
  --file <path>                Path to a pattern JSON file.
  --name <name>                Override the pattern name.
  --description <description>  Override the pattern description.
  -h, --help                   display help for command
```
```
$ calm-hub-cli patterns versions --help
Usage: calm-hub-cli patterns versions [options]

List versions for a pattern.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Pattern id.
  -h, --help               display help for command
```
```
$ calm-hub-cli patterns get --help
Usage: calm-hub-cli patterns get [options]

Get a specific pattern version.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Pattern id.
  --version <version>      Pattern version.
  -h, --help               display help for command
```
```
$ calm-hub-cli patterns create-version --help
Usage: calm-hub-cli patterns create-version [options]

Create a new version for an existing pattern.

Options:
  --namespace <namespace>      Namespace name.
  --id <id>                    Pattern id.
  --version <version>          Version to create.
  --file <path>                Path to a pattern JSON file.
  --name <name>                Override the pattern name.
  --description <description>  Override the pattern description.
  -h, --help                   display help for command
```

## interfaces --help
```
$ calm-hub-cli interfaces --help
Usage: calm-hub-cli interfaces [options] [command]

Manage calm-hub interfaces.

Options:
  -h, --help                display help for command

Commands:
  list [options]            List interface summaries for a namespace.
  create [options]          Create a new interface in a namespace from a JSON
                            file.
  versions [options]        List versions for a interface.
  get [options]             Get a specific interface version.
  create-version [options]  Create a new version for an existing interface.
  help [command]            display help for command
```
```
$ calm-hub-cli interfaces list --help
Usage: calm-hub-cli interfaces list [options]

List interface summaries for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  -h, --help               display help for command
```
```
$ calm-hub-cli interfaces create --help
Usage: calm-hub-cli interfaces create [options]

Create a new interface in a namespace from a JSON file.

Options:
  --namespace <namespace>      Namespace name.
  --file <path>                Path to a interface JSON file.
  --name <name>                Override the interface name.
  --description <description>  Override the interface description.
  -h, --help                   display help for command
```
```
$ calm-hub-cli interfaces versions --help
Usage: calm-hub-cli interfaces versions [options]

List versions for a interface.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Interface id.
  -h, --help               display help for command
```
```
$ calm-hub-cli interfaces get --help
Usage: calm-hub-cli interfaces get [options]

Get a specific interface version.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Interface id.
  --version <version>      Interface version.
  -h, --help               display help for command
```
```
$ calm-hub-cli interfaces create-version --help
Usage: calm-hub-cli interfaces create-version [options]

Create a new version for an existing interface.

Options:
  --namespace <namespace>      Namespace name.
  --id <id>                    Interface id.
  --version <version>          Version to create.
  --file <path>                Path to a interface JSON file.
  --name <name>                Override the interface name.
  --description <description>  Override the interface description.
  -h, --help                   display help for command
```

## standards --help
```
$ calm-hub-cli standards --help
Usage: calm-hub-cli standards [options] [command]

Manage calm-hub standards.

Options:
  -h, --help                display help for command

Commands:
  list [options]            List standard summaries for a namespace.
  create [options]          Create a new standard in a namespace from a JSON
                            file.
  versions [options]        List versions for a standard.
  get [options]             Get a specific standard version.
  create-version [options]  Create a new version for an existing standard.
  help [command]            display help for command
```
```
$ calm-hub-cli standards list --help
Usage: calm-hub-cli standards list [options]

List standard summaries for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  -h, --help               display help for command
```
```
$ calm-hub-cli standards create --help
Usage: calm-hub-cli standards create [options]

Create a new standard in a namespace from a JSON file.

Options:
  --namespace <namespace>      Namespace name.
  --file <path>                Path to a standard JSON file.
  --name <name>                Override the standard name.
  --description <description>  Override the standard description.
  -h, --help                   display help for command
```
```
$ calm-hub-cli standards versions --help
Usage: calm-hub-cli standards versions [options]

List versions for a standard.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Standard id.
  -h, --help               display help for command
```
```
$ calm-hub-cli standards get --help
Usage: calm-hub-cli standards get [options]

Get a specific standard version.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Standard id.
  --version <version>      Standard version.
  -h, --help               display help for command
```
```
$ calm-hub-cli standards create-version --help
Usage: calm-hub-cli standards create-version [options]

Create a new version for an existing standard.

Options:
  --namespace <namespace>      Namespace name.
  --id <id>                    Standard id.
  --version <version>          Version to create.
  --file <path>                Path to a standard JSON file.
  --name <name>                Override the standard name.
  --description <description>  Override the standard description.
  -h, --help                   display help for command
```

## flows --help
```
$ calm-hub-cli flows --help
Usage: calm-hub-cli flows [options] [command]

Manage calm-hub flows.

Options:
  -h, --help                display help for command

Commands:
  list [options]            List flow summaries for a namespace.
  create [options]          Create a new flow in a namespace from a JSON file.
  versions [options]        List versions for a flow.
  get-version [options]     Get a specific flow version.
  create-version [options]  Create a new version for an existing flow.
  get [options]             Get the latest flow version.
  help [command]            display help for command
```
```
$ calm-hub-cli flows list --help
Usage: calm-hub-cli flows list [options]

List flow summaries for a namespace.

Options:
  --namespace <namespace>  Namespace name.
  -h, --help               display help for command
```
```
$ calm-hub-cli flows create --help
Usage: calm-hub-cli flows create [options]

Create a new flow in a namespace from a JSON file.

Options:
  --namespace <namespace>      Namespace name.
  --file <path>                Path to a flow JSON file.
  --name <name>                Override the flow name.
  --description <description>  Override the flow description.
  -h, --help                   display help for command
```
```
$ calm-hub-cli flows versions --help
Usage: calm-hub-cli flows versions [options]

List versions for a flow.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Flow id.
  -h, --help               display help for command
```
```
$ calm-hub-cli flows get --help
Usage: calm-hub-cli flows get [options]

Get the latest flow version.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Flow id.
  -h, --help               display help for command
```
```
$ calm-hub-cli flows get-version --help
Usage: calm-hub-cli flows get-version [options]

Get a specific flow version.

Options:
  --namespace <namespace>  Namespace name.
  --id <id>                Flow id.
  --version <version>      Flow version.
  -h, --help               display help for command
```
```
$ calm-hub-cli flows create-version --help
Usage: calm-hub-cli flows create-version [options]

Create a new version for an existing flow.

Options:
  --namespace <namespace>      Namespace name.
  --id <id>                    Flow id.
  --version <version>          Version to create.
  --file <path>                Path to a flow JSON file.
  --name <name>                Override the flow name.
  --description <description>  Override the flow description.
  -h, --help                   display help for command
```
