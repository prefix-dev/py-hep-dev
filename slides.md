---
# Tufte-inspired theme, local in ./slidev-theme-tufte
theme: ./slidev-theme-tufte
title: They all have a pixi.toml. Why?
info: |
  ## Scipy, Numpy, Xarray and Python all have a pixi.toml. Why?
  After 3 years, Pixi is widely adopted in the scientific Python ecosystem.
  PyHEP Dev summit, Ruben Arts, prefix.dev
class: text-center
drawings:
  persist: false
mdc: true
duration: 25min
transition: null
---

<div class="relative mx-auto w-48">
  <img src="/paxton.png" class="w-full" alt="Paxton" />
</div>

# Scipy, Numpy, Xarray and Python

## ...all have a `pixi.toml`. Why?

Ruben Arts at <img src="/prefix-logo.svg" class="inline align-middle h-5 mx-1" alt="prefix.dev" />

<div class="subtitle mt-8">PyHEP Dev summit - <a href="https://pixi.sh">pixi.sh</a></div>


---

# Basics: what is Pixi?

<DocLink href="https://pixi.prefix.dev/latest/getting_started/" label="getting started" />

Cross-platform, environment management and build tool for any language.
<div class="grid grid-cols-2 gap-8 mt-6">

<div>
<div v-click="1">

One manifest describes a whole project:

- **dependencies**: conda *and* PyPI, together
- **tasks**: run the same command everywhere
- **environments**: construct usecase specific envs
- a **cross-platform lockfile**: `pixi.lock`
</div>

<div v-click="2" class="mt-4">

It replaces the pile you keep in your README:

- `apt`, `brew`, `pip`, `conda`
- `virtualenv`, `venv`, `conda env`
- Makefiles, shell scripts, CI YAML

</div>
</div>

<CodeWindow v-click="1" title="pixi.toml">

```toml {lines: true}
[workspace]
channels = ["conda-forge"]
platforms = ["linux-64", "osx-arm64", "win-64"]

[dependencies]
python = ">=3.12"
numpy = "*"
pytest = ">=7.0"

[tasks]
test = "pytest"
```

</CodeWindow>
</div>

<div v-click="1" class="justify-end absolute bottom-16 right-12 flex">
  <img src="/conda-forge.png" class="h-40" alt="conda-forge" />
</div>


---

# Basics: tasks

<DocLink href="https://pixi.prefix.dev/latest/workspace/advanced_tasks/" label="tasks" />

<div class="grid grid-cols-2 gap-8 mt-6">

<CodeWindow title="pixi.toml">

```toml {lines: true}
[tasks]
# a plain shell command
test = "pytest -q"

# tasks compose into a graph
build = "meson compile -C build"
start = { depends-on = ["build", "test"] }

# arguments with defaults
[tasks.fmt]
cmd = "ruff format {{ path }}"
args = [{ arg = "path", default = "." }]

# skip work when nothing changed
[tasks.docs]
cmd = "sphinx-build docs _site"
inputs = ["docs/**"]
outputs = ["_site/**"]
```

</CodeWindow>

<div>

<v-clicks>

- One name, the **same command** on every OS and machine
- `depends-on` builds a graph, pixi runs it in order
- Tasks take **arguments**, `cwd`, and per-task **environment activation**
- `inputs`/`outputs` add **caching**, unchanged work is skipped
- `pixi run <task>` replaces the Makefile, shell script, CI-YAML pile

</v-clicks>

</div>
</div>

---

# Basics: CI made easy

<DocLink href="https://pixi.prefix.dev/latest/integration/ci/github_actions/" label="GitHub Actions" />

<div class="grid grid-cols-2 gap-6 mt-6 items-start">

<Terminal title="On your laptop">
  <TermLine>pixi run test</TermLine>
  <TermLine output>✓ environment up-to-date</TermLine>
  <TermLine output>========= 42 passed in 3.14s =========</TermLine>
</Terminal>

<CodeWindow title=".github/workflows/ci.yml">

```yaml {lines: true}
steps:
  - uses: actions/checkout@v4
  - uses: prefix-dev/setup-pixi@v0.10.0
  # the exact command you run locally:
  - run: pixi run test
```

</CodeWindow>

</div>

<v-clicks>

- **Local == CI**: same lockfile, same env, same command
- This makes your setup CI system agnostics
- Very easy caching setup so runs are really fast

</v-clicks>

---

# You and your friends are joining the group!

<div class="mt-2">


</div>

- **[Python](https://github.com/python/cpython/tree/main/Tools/pixi-packages)** - `Tools/pixi-packages/` - managed builds: ASAN, freethreading, TSAN
- **[NumPy](https://github.com/numpy/numpy/tree/main/pixi-packages)** - `pixi-packages/` - transitive source builds: ASAN, freethreading, TSAN
- **[SciPy](https://github.com/scipy/scipy/blob/main/pixi.toml)** - `pixi.toml` - 30+ environments across platforms and users
- **[pandas](https://github.com/pandas-dev/pandas/blob/main/pixi.toml)** - `pixi.toml` - development environments and a big test matrix, incl. freethreading
- **[Xarray](https://github.com/pydata/xarray/blob/main/pixi.toml)** - `pixi.toml` - development environments and a big test matrix, incl. nightly builds
- **[cuda-python](https://github.com/NVIDIA/cuda-python/blob/main/pixi.toml)** - `pixi.toml` - monorepo orchestration: root tasks fan out to sub-package manifests, in CUDA 12 & 13 environments
- And many more projects in the scientific Python ecosystem

<div class="absolute right-12 bottom-16 w-256 flex flex-wrap items-center justify-end gap-x-8 gap-y-6 opacity-90">
  <img src="/python.svg" class="h-10" alt="Python" />
  <img src="/numpy.svg" class="h-12" alt="NumPy" />
  <img src="/scipy.svg" class="h-12" alt="SciPy" />
  <img src="/pandas.svg" class="h-12" alt="pandas" />
  <img src="/xarray.svg" class="h-12" alt="Xarray" />
  <img src="/nvidia.svg" class="h-8" alt="NVIDIA" />
</div>

---
layout: center
class: text-center
---

# So, why did they all adopt it?

<div class="flex justify-center mt-6">
<div class="text-left">

- build from source
- simplify complex build environments
- reproducible across platforms

</div>
</div>

---

# Demo:

Build Python from source!

<div class="grid grid-cols-2 gap-6 mt-4 items-start">

<Terminal title="install a prerelease CPython">
  <TermLine>pixi global install \</TermLine>
  <div class="term-line pl-8">--git https://github.com/python/cpython \</div>
  <div class="term-line pl-8">--subdir Tools/pixi-packages/default \</div>
  <div class="term-line pl-8">--tag v3.15.0b3 \</div>
  <div class="term-line pl-8">--force-reinstall \</div>
  <div class="term-line pl-8">python</div>
</Terminal>

<CodeWindow title="pixi.toml equivalent">

```toml
[workspace]
channels = ["conda-forge"]
platforms = ["osx-arm64", "linux-64"]
preview = ["pixi-build"]

[dependencies.python]
git = "https://github.com/python/cpython"
tag = "v3.15.0b3"
subdirectory = "Tools/pixi-packages/default"

[tasks]
start = "python -VV"
```

</CodeWindow>

</div>


---

# 1. Build compiled code from source

<DocLink href="https://pixi.prefix.dev/latest/build/getting_started/" label="pixi-build" />

<div class="grid grid-cols-[1.3fr_1fr] gap-6 mt-2">

<CodeWindow title="numpy/pixi-packages/asan/pixi.toml" href="https://github.com/numpy/numpy/blob/main/pixi-packages/asan/pixi.toml">

```toml {lines: true}
[workspace]
channels = ["https://prefix.dev/conda-forge"]
platforms = ["linux-64", "linux-aarch64", "osx-arm64"]
preview = ["pixi-build"]

# build NumPy itself, with a build backend
[package.build.backend]
name = "pixi-build-python"

[package.build.config]
compilers = ["c", "cxx"]
extra-args = ["-Csetup-args=-Db_sanitize=address"]
env.ASAN_OPTIONS = "detect_leaks=0:symbolize=1..."

# even pin a CPython built from git, for this build
[package.host-dependencies]
python.git = "https://github.com/python/cpython"
python.subdirectory = "Tools/pixi-packages/asan"
meson-python = "*"
cython = "*"
```

</CodeWindow>

<div>

<v-clicks>

- conda-forge ships the **compilers** (C/C++/Fortran/CUDA), not just wheels
- compiles NumPy in the reproducible env
- compiles CPython from source, with ASAN

</v-clicks>

</div>
</div>

---

# 2. Many environments, one manifest

<DocLink href="https://pixi.prefix.dev/latest/workspace/multi_environment/" label="environments" />

<div class="grid grid-cols-[1.2fr_1fr] gap-6 mt-2">

<CodeWindow title="scipy/pixi.toml" href="https://github.com/scipy/scipy/blob/main/pixi.toml">

```toml {lines: true}
# a feature turns behavior on...
[feature.py-freethreading.dependencies]
python-freethreading = "*"
[feature.py-freethreading.activation.env]
PYTHON_GIL = "0"

[feature.cuda12.dependencies]
cuda-version = "==12.9"

# environments compose features
# 30+ of them, e.g.:
[environments.cupy]
features = ["run-deps", "test-deps", "cuda13", "py-cuda"]
solve-group = "cuda13"

[environments.build-freethreading]
features = ["py-freethreading", "build-deps", "..."]
no-default-feature = true # avoid python-gil
solve-group = "freethreading"
```

</CodeWindow>

<div>

<v-clicks>

- **Features** are reusable slices of deps/tasks/activation
- **Environments** compose features
- SciPy ships **30+**: BLAS variants, GPU stacks, freethreading, debug
- Pick one at run time: <br>`pixi run -e cupy test`
- Each contributor gets the environment they need, reproducibly

</v-clicks>

</div>
</div>

---

# 3. Many platforms, pin the exact machine

<DocLink href="https://pixi.prefix.dev/latest/workspace/multi_platform_configuration/" label="multi-platform" />

<div class="grid grid-cols-2 gap-6 mt-2 items-start">

<CodeWindow title="scipy/pixi.toml" href="https://github.com/scipy/scipy/blob/main/pixi.toml">

```toml {lines: true}
[workspace]
platforms = [
  "linux-64", "osx-arm64", "win-64", "linux-aarch64",
  # same lockfile, GPU targets too:
  { platform = "linux-64", cuda = "12.9" },
  { platform = "linux-64", cuda = "13.0" },
]
```

</CodeWindow>

<CodeWindow title="pandas/pixi.toml" href="https://github.com/pandas-dev/pandas/blob/main/pixi.toml">

```toml {lines: true}
platforms = ["linux-64", "linux-aarch64",
             "osx-64", "osx-arm64", "win-64"]
# environments:
# py311/py312/py313/py314, minimum-versions
# numpy-nightly, downstream, freethreading
```

</CodeWindow>

</div>

<v-clicks>

- The solver treats hardware as **virtual packages**: `__cuda`, `__glibc`, `__osx`, `__archspec`
- So the lockfile pins the **exact machine**, not "some Linux"
- One `pixi.lock` resolves for laptop, CI, an A100 node, and `aarch64`, with the right CUDA build only where there's a GPU
- pandas runs a whole **test matrix** from one manifest

</v-clicks>

---

# Notable recent improvements

<DocLink href="https://pixi.prefix.dev/latest/reference/pixi_manifest/" label="manifest" />

<div class="grid grid-cols-3 gap-4 mt-6 items-start">

<div v-click="1">

**Conditional dependencies**

<CodeWindow title="pixi.toml">

```toml
[dependencies.unix-helper]
version = "*"
when = "__unix"

[dependencies.cupy]
version = "*"
when = "__cuda >= 13.0"

[dependencies.typing-ext]
version = "*"
when = "python < 3.12"
```

</CodeWindow>

</div>

<div v-click="2">

**Extras**

<CodeWindow title="pixi.toml">

```toml
[dependencies.my-pkg]
version = "*"
extras = ["plot"]

[pypi-dependencies.pandas]
version = ">=2"
extras = ["excel"]
```

</CodeWindow>

</div>

<div v-click="3">

**Workspace dependencies**

<CodeWindow title="pixi.toml">

```toml
[workspace.dependencies]
numpy = "1.*"

[workspace.dependencies.shared-lib]
path = "packages/shared-lib"

# members inherit the pin
[package.run-dependencies]
numpy = { workspace = true }
shared-lib = { workspace = true }
```

</CodeWindow>

</div>

</div>


---

# Build and Ship a package: `pixi publish`

<DocLink href="https://pixi.prefix.dev/latest/reference/cli/pixi/publish/" label="pixi publish" />

<div class="grid grid-cols-2 gap-6 mt-4 items-start">

<Terminal title="build & ship a package">
  <TermLine>pixi publish --target-channel https://prefix.dev/my-channel</TermLine>
  <TermLine output>✓ built, pushed, attested (OIDC)</TermLine>
</Terminal>

<div>

<v-clicks>

- **Publish** your package to a channel, SciPy already does this [in CI](https://github.com/scipy/scipy/blob/main/.github/workflows/pixi-packages.yml)
-
- **Trusted publishing**: OIDC, attestations, no long-lived tokens

</v-clicks>

</div>

</div>

---

# Ship a whole environment: `pixi pack`

<DocLink href="https://pixi.prefix.dev/latest/deployment/pixi_pack/" label="pixi pack" />

<div class="grid grid-cols-2 gap-6 mt-4 items-start">

<Terminal title="freeze the environment">
  <TermLine>pixi pack --platform linux-64</TermLine>
  <TermLine output>📦 environment.tar, no pixi/conda needed on target</TermLine>
</Terminal>

<div>

<v-clicks>

- Freezes the **locked environment** into a single archive
- Made for **air-gapped / cluster** runs: nothing to install on the target
- Unpack and run: the same lockfile-exact environment, anywhere

</v-clicks>

</div>

</div>

<div v-click class="mt-4 text-center opacity-80">

Research → production, same tool, same lockfile.

</div>

---
layout: center
class: text-center
---

# This is the dream

<div class="text-left mt-10 mx-auto w-max max-w-full">

<Terminal title="Terminal">
  <TermLine v-click="1">git clone https://github.com/my-org/my-science-project.git</TermLine>
  <TermLine v-click="1">cd my-science-project</TermLine>
  <TermLine v-click="2">pixi run start</TermLine>
  <TermLine output v-click="2">✓ environment resolved & installed</TermLine>
  <TermLine output v-click="2">✓ running analysis.py ...</TermLine>
</Terminal>

</div>

<div v-click="3" class="mt-8 opacity-80">

That's the file Python, NumPy, SciPy, pandas and Xarray all committed. That's the why.

</div>

---

# Your turn

<DocLink href="https://pixi.prefix.dev/latest/reference/cli/pixi/init/" label="pixi init" />

<div class="grid grid-cols-[1.2fr_1fr] gap-8 mt-6">

<div>

<Terminal title="pick where you are">
  <TermLine output v-click="1"># 1. start fresh</TermLine>
  <TermLine v-click="1">pixi init my-analysis && cd my-analysis</TermLine>
  <TermLine v-click="1">pixi add python numpy matplotlib</TermLine>
  <TermLine output v-click="2"># 2. coming from conda / mamba</TermLine>
  <TermLine v-click="2">pixi init --import environment.yml</TermLine>
  <TermLine output v-click="3"># 3. already a Python package</TermLine>
  <TermLine v-click="3">pixi init --format pyproject</TermLine>
</Terminal>

</div>

<div>

<div v-click="1" class="mt-2">

**Start fresh**: manifest, environment and lockfile appear as you go

</div>

<div v-click="2" class="mt-4">

**Import**: channels and dependencies come along from `environment.yml`

</div>

<div v-click="3" class="mt-4">

**Extend**: pixi lives inside `pyproject.toml` under `[tool.pixi]`; your PyPI deps stay where they are

</div>

<div v-click="4" class="mt-6">

Whatever the mode: commit `pixi.toml` **and** `pixi.lock`, teammates just `pixi run`

</div>

</div>
</div>

---

# Grow the environment into a package

<DocLink href="https://pixi.prefix.dev/latest/build/dev/" label="dev packages" />

<div class="grid grid-cols-[1.2fr_1fr] gap-6 mt-2">

<CodeWindow title="pixi.toml">

```toml {lines: true}
[workspace]
channels = ["https://prefix.dev/conda-forge"]
platforms = ["linux-64", "osx-arm64", "win-64"]
preview = ["pixi-build"]

# your project becomes a real conda package
[package.build.backend]
name = "pixi-build-python"
version = "*"

[package.run-dependencies]
numpy = "*"

# develop against it, without installing it
[dev]
my-project = { path = "." }

[dependencies]
pytest = "*"
```

</CodeWindow>

<div>

<v-clicks>

- Adding a `[package]` section is the **same move** NumPy, SciPy and CPython made
- `[dev]` + a **path dependency**: the package's build/host/run deps land in your env, the package itself isn't built. Fast dev loop
- Path dependencies split one repo into **multiple packages** as it grows
- From here: `pixi publish`, or others depend on you straight **from git**

</v-clicks>

</div>
</div>

---

# Where you can help

<v-clicks>

- **Try Pixi** share your experience and help us and other improve it.
- **[Contribute to conda-forge](https://conda-forge.org/docs/maintainer/adding_pkgs/)**: add the packages your field needs, so everyone can `pixi add` them
- **Join our [Discord](https://discord.gg/kKV8ZxyzY4)** and help us and others with your experience, or just hang out and chat.

</v-clicks>


---

# A little about Prefix.dev

<div class="grid grid-cols-[1.4fr_1fr] gap-8 mt-4 items-center">

<div>

We build Pixi, rattler-build, and the `rattler` core, and keep them free.

- Public, private & on-premise **channels** for your team
- Security-first: OIDC, attestations, CVE mapping, reproducible builds
- Onboarding & support for **Pixi** and **Conda** users

</div>

<div class="text-center">
  <img src="/prefix-logo.svg" class="h-16 mx-auto" alt="prefix.dev" />
</div>

</div>

---
layout: center
class: text-center
---

# Thanks, PyHEP Dev summit.

<img src="/prefix-logo.svg" class="h-24 mx-auto mt-4 mb-6" alt="prefix.dev" />

Read the real files:
[python](https://github.com/python/cpython/tree/main/Tools/pixi-packages),
[numpy](https://github.com/numpy/numpy/tree/main/pixi-packages),
[scipy](https://github.com/scipy/scipy/blob/main/pixi.toml),
[pandas](https://github.com/pandas-dev/pandas/blob/main/pixi.toml),
[xarray](https://github.com/pydata/xarray/blob/main/pixi.toml),
[cuda-python](https://github.com/NVIDIA/cuda-python/blob/main/pixi.toml)

<div class="mt-6">

[pixi.sh](https://pixi.sh) - [prefix.dev](https://prefix.dev) - [github.com/prefix-dev](https://github.com/prefix-dev)

</div>

<br/>

*Happy to talk builds, environments, GPU targeting, or reproducibility.*
