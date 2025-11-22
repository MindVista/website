import * as migration_20250403_154007_remove_root from "./20250403_154007_remove_root";
import * as migration_20250430_051055_sentinel from "./20250430_051055_sentinel";
import * as migration_20251113_181810 from "./20251113_181810";
import * as migration_20251122_200309 from "./20251122_200309";
import * as migration_20251122_203147 from "./20251122_203147";
import * as migration_20251122_214215 from "./20251122_214215";

export const migrations = [
    {
        up: migration_20250403_154007_remove_root.up,
        down: migration_20250403_154007_remove_root.down,
        name: "20250403_154007_remove_root",
    },
    {
        up: migration_20250430_051055_sentinel.up,
        down: migration_20250430_051055_sentinel.down,
        name: "20250430_051055_sentinel",
    },
    {
        up: migration_20251113_181810.up,
        down: migration_20251113_181810.down,
        name: "20251113_181810",
    },
    {
        up: migration_20251122_200309.up,
        down: migration_20251122_200309.down,
        name: "20251122_200309",
    },
    {
        up: migration_20251122_203147.up,
        down: migration_20251122_203147.down,
        name: "20251122_203147",
    },
    {
        up: migration_20251122_214215.up,
        down: migration_20251122_214215.down,
        name: "20251122_214215",
    },
];
