import { useState } from "react";

const sections = [
  {
    id: "tensors",
    label: "Tensors",
    icon: "⬛",
    color: "#EE4C2C",
    snippets: [
      {
        title: "Creating Tensors",
        code: `import torch

# From Python list
t = torch.tensor([1, 2, 3])
t2d = torch.tensor([[1, 2], [3, 4]])

# Special tensors
zeros = torch.zeros(3, 4)        # All zeros
ones  = torch.ones(3, 4)         # All ones
eye   = torch.eye(3)             # Identity matrix
rand  = torch.rand(3, 4)         # Uniform [0,1)
randn = torch.randn(3, 4)        # Normal(0,1)
full  = torch.full((3, 4), 7.0)  # Filled with value
arange = torch.arange(0, 10, 2) # [0, 2, 4, 6, 8]
linspace = torch.linspace(0, 1, 5) # 5 evenly spaced`,
      },
      {
        title: "Tensor Properties",
        code: `t = torch.randn(3, 4)

t.shape        # torch.Size([3, 4])
t.size()       # same as shape
t.dtype        # torch.float32
t.device       # device(type='cpu')
t.ndim         # 2
t.numel()      # 12  (total elements)
t.requires_grad # False`,
      },
      {
        title: "dtype & Device",
        code: `# Specify dtype
t = torch.tensor([1.0, 2.0], dtype=torch.float64)
t = torch.zeros(3, dtype=torch.int32)

# Common dtypes:
# torch.float32 / torch.float
# torch.float64 / torch.double
# torch.int32   / torch.int
# torch.int64   / torch.long
# torch.bool

# Move to GPU / CPU
t = t.to("cuda")   # or t.cuda()
t = t.to("cpu")    # or t.cpu()
t = t.to(device)   # device variable`,
      },
    ],
  },
  {
    id: "ops",
    label: "Operations",
    icon: "➕",
    color: "#F5A623",
    snippets: [
      {
        title: "Math & Element-wise Ops",
        code: `a = torch.tensor([1., 2., 3.])
b = torch.tensor([4., 5., 6.])

a + b        # or torch.add(a, b)
a - b        # or torch.sub(a, b)
a * b        # or torch.mul(a, b)  element-wise
a / b        # or torch.div(a, b)
a ** 2       # or torch.pow(a, 2)
torch.sqrt(a)
torch.exp(a)
torch.log(a)
torch.abs(a)
torch.clamp(a, min=0, max=2)   # clip values`,
      },
      {
        title: "Matrix Operations",
        code: `A = torch.randn(3, 4)
B = torch.randn(4, 5)

# Matrix multiply
C = A @ B                  # (3, 5)
C = torch.matmul(A, B)     # same
C = torch.mm(A, B)         # 2D only

# Batch matrix multiply
A = torch.randn(8, 3, 4)
B = torch.randn(8, 4, 5)
C = torch.bmm(A, B)        # (8, 3, 5)

# Dot product (1D)
torch.dot(a, b)

# Transpose
A.T          # 2D
A.transpose(0, 1)
A.permute(2, 0, 1)   # reorder dims`,
      },
      {
        title: "Reduction Ops",
        code: `t = torch.randn(3, 4)

t.sum()             # sum of all
t.sum(dim=0)        # sum along rows -> (4,)
t.sum(dim=1)        # sum along cols -> (3,)
t.sum(dim=1, keepdim=True) # (3,1)

t.mean()
t.std()
t.var()
t.min()
t.max()
t.argmin()          # index of min
t.argmax()          # index of max
t.median()
torch.norm(t)       # L2 norm`,
      },
      {
        title: "Shape Manipulation",
        code: `t = torch.randn(2, 3, 4)

t.view(6, 4)          # reshape (contiguous)
t.reshape(24)         # reshape (safe)
t.flatten()           # -> 1D
t.unsqueeze(0)        # add dim at 0 -> (1,2,3,4)
t.squeeze()           # remove dims of size 1
t.squeeze(0)          # remove specific dim

# Concatenate & stack
a = torch.randn(2, 3)
b = torch.randn(2, 3)
torch.cat([a, b], dim=0)   # (4, 3)
torch.cat([a, b], dim=1)   # (2, 6)
torch.stack([a, b], dim=0) # (2, 2, 3) new dim

# Repeat / expand
a.repeat(2, 3)        # copy data
a.expand(5, 3)        # no copy (size-1 dims only)`,
      },
      {
        title: "Indexing & Slicing",
        code: `t = torch.randn(4, 5)

t[0]          # first row
t[:, 1]       # second column
t[1:3, 2:4]   # slice
t[0, -1]      # first row, last col

# Boolean mask
mask = t > 0
t[mask]           # 1D tensor of positive values
t[t > 0] = 0      # set positives to 0

# Fancy / gather
idx = torch.tensor([0, 2])
t[idx]            # rows 0 and 2

# scatter_ / gather
out = torch.gather(t, 1, idx_tensor)`,
      },
    ],
  },
  {
    id: "autograd",
    label: "Autograd",
    icon: "∂",
    color: "#4CAF50",
    snippets: [
      {
        title: "Gradients Basics",
        code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2 + 2 * x + 1   # y = x^2 + 2x + 1
y.backward()              # dy/dx = 2x + 2

print(x.grad)  # tensor(8.)  (2*3+2=8)

# Multi-variable
x = torch.randn(3, requires_grad=True)
y = (x ** 2).sum()
y.backward()
print(x.grad)   # 2 * x`,
      },
      {
        title: "Gradient Control",
        code: `# Detach from graph
x = torch.randn(3, requires_grad=True)
z = x.detach()          # no grad tracking

# No-grad context (inference)
with torch.no_grad():
    y = model(x)        # faster, no grad stored

# Functional no-grad
@torch.no_grad()
def predict(x):
    return model(x)

# Zero gradients (important in training!)
optimizer.zero_grad()   # preferred
# or manually:
for p in model.parameters():
    if p.grad is not None:
        p.grad.zero_()`,
      },
      {
        title: "Custom Autograd Function",
        code: `class MyReLU(torch.autograd.Function):
    @staticmethod
    def forward(ctx, x):
        ctx.save_for_backward(x)
        return x.clamp(min=0)

    @staticmethod
    def backward(ctx, grad_output):
        x, = ctx.saved_tensors
        grad = grad_output.clone()
        grad[x < 0] = 0
        return grad

relu = MyReLU.apply
y = relu(torch.randn(5, requires_grad=True))`,
      },
    ],
  },
  {
    id: "nn",
    label: "nn.Module",
    icon: "🧠",
    color: "#2196F3",
    snippets: [
      {
        title: "Defining a Model",
        code: `import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, in_dim, hidden, out_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden, out_dim),
        )

    def forward(self, x):
        return self.net(x)

model = MLP(784, 256, 10)
print(model)`,
      },
      {
        title: "Common Layers",
        code: `nn.Linear(in, out, bias=True)
nn.Conv2d(in_ch, out_ch, kernel, stride=1, padding=0)
nn.ConvTranspose2d(...)     # upsampling
nn.MaxPool2d(kernel, stride)
nn.AvgPool2d(kernel, stride)
nn.AdaptiveAvgPool2d((H, W))

# Normalization
nn.BatchNorm1d(num_features)
nn.BatchNorm2d(num_features)
nn.LayerNorm(normalized_shape)
nn.GroupNorm(groups, channels)

# Recurrent
nn.RNN(input_size, hidden_size, num_layers)
nn.LSTM(input_size, hidden_size, num_layers)
nn.GRU(input_size, hidden_size, num_layers)

# Attention / Transformers
nn.MultiheadAttention(embed_dim, num_heads)
nn.TransformerEncoderLayer(d_model, nhead)
nn.Transformer(d_model, nhead, num_layers)

# Embedding
nn.Embedding(vocab_size, embed_dim)`,
      },
      {
        title: "Activation Functions",
        code: `nn.ReLU()
nn.LeakyReLU(negative_slope=0.01)
nn.PReLU()
nn.ELU(alpha=1.0)
nn.GELU()
nn.SiLU()              # Swish
nn.Sigmoid()
nn.Tanh()
nn.Softmax(dim=-1)
nn.LogSoftmax(dim=-1)

# Functional equivalents
import torch.nn.functional as F
F.relu(x)
F.gelu(x)
F.sigmoid(x)
F.softmax(x, dim=-1)`,
      },
      {
        title: "Model Inspection",
        code: `model = MLP(784, 256, 10)

# Parameters
list(model.parameters())
list(model.named_parameters())

# Count params
total = sum(p.numel() for p in model.parameters())
trainable = sum(p.numel() for p in model.parameters()
                if p.requires_grad)

# State dict (weights)
sd = model.state_dict()         # OrderedDict
model.load_state_dict(sd)       # load weights

# Freeze / unfreeze
for p in model.parameters():
    p.requires_grad = False

# Move model
model.to("cuda")
model.cuda()
model.cpu()`,
      },
    ],
  },
  {
    id: "loss",
    label: "Loss & Optimizers",
    icon: "📉",
    color: "#9C27B0",
    snippets: [
      {
        title: "Loss Functions",
        code: `import torch.nn as nn

# Classification
nn.CrossEntropyLoss()     # logits + class idx
nn.NLLLoss()              # log-probs + class idx
nn.BCELoss()              # binary, sigmoid output
nn.BCEWithLogitsLoss()    # binary, raw logits (stable)

# Regression
nn.MSELoss()              # mean squared error
nn.L1Loss()               # mean absolute error
nn.HuberLoss(delta=1.0)   # robust regression
nn.SmoothL1Loss()         # same as Huber

# Usage
criterion = nn.CrossEntropyLoss()
loss = criterion(logits, targets)  # scalar
loss.backward()`,
      },
      {
        title: "Optimizers",
        code: `import torch.optim as optim

# Common optimizers
optim.SGD(model.parameters(), lr=0.01,
          momentum=0.9, weight_decay=1e-4)
optim.Adam(model.parameters(), lr=1e-3,
           betas=(0.9, 0.999), eps=1e-8)
optim.AdamW(model.parameters(), lr=1e-3,
            weight_decay=0.01)
optim.RMSprop(model.parameters(), lr=0.01)
optim.Adagrad(model.parameters(), lr=0.01)

# Per-layer learning rates
optim.Adam([
    {"params": model.layer1.parameters(), "lr": 1e-4},
    {"params": model.layer2.parameters(), "lr": 1e-3},
], lr=1e-3)`,
      },
      {
        title: "LR Schedulers",
        code: `from torch.optim import lr_scheduler

scheduler = lr_scheduler.StepLR(
    optimizer, step_size=10, gamma=0.1)

scheduler = lr_scheduler.CosineAnnealingLR(
    optimizer, T_max=50)

scheduler = lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='min', patience=5)

scheduler = lr_scheduler.OneCycleLR(
    optimizer, max_lr=0.01, steps_per_epoch=100,
    epochs=10)

scheduler = lr_scheduler.ExponentialLR(
    optimizer, gamma=0.95)

# Step after each epoch
for epoch in range(epochs):
    train(...)
    scheduler.step()`,
      },
    ],
  },
  {
    id: "training",
    label: "Training Loop",
    icon: "🔄",
    color: "#00BCD4",
    snippets: [
      {
        title: "Full Training Loop",
        code: `model = MLP(784, 256, 10).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=1e-3)

for epoch in range(num_epochs):
    # --- Training ---
    model.train()
    running_loss = 0
    for X, y in train_loader:
        X, y = X.to(device), y.to(device)

        optimizer.zero_grad()     # 1. clear grads
        logits = model(X)         # 2. forward
        loss = criterion(logits, y) # 3. loss
        loss.backward()           # 4. backward
        optimizer.step()          # 5. update

        running_loss += loss.item()

    # --- Validation ---
    model.eval()
    with torch.no_grad():
        for X, y in val_loader:
            X, y = X.to(device), y.to(device)
            preds = model(X)
            val_loss = criterion(preds, y)`,
      },
      {
        title: "DataLoader & Dataset",
        code: `from torch.utils.data import Dataset, DataLoader

class MyDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X, dtype=torch.float32)
        self.y = torch.tensor(y, dtype=torch.long)

    def __len__(self):
        return len(self.y)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

dataset = MyDataset(X_np, y_np)
loader = DataLoader(dataset,
                    batch_size=32,
                    shuffle=True,
                    num_workers=4,
                    pin_memory=True)  # faster GPU transfer`,
      },
      {
        title: "Save & Load Checkpoint",
        code: `# Save
torch.save({
    "epoch": epoch,
    "model_state": model.state_dict(),
    "optim_state": optimizer.state_dict(),
    "loss": best_loss,
}, "checkpoint.pt")

# Load
ckpt = torch.load("checkpoint.pt")
model.load_state_dict(ckpt["model_state"])
optimizer.load_state_dict(ckpt["optim_state"])
start_epoch = ckpt["epoch"]

# Save model only
torch.save(model.state_dict(), "model.pt")
model.load_state_dict(torch.load("model.pt"))`,
      },
    ],
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: "🚀",
    color: "#FF5722",
    snippets: [
      {
        title: "Gradient Clipping & Mixed Precision",
        code: `from torch.cuda.amp import GradScaler, autocast

scaler = GradScaler()

for X, y in loader:
    optimizer.zero_grad()

    with autocast():            # fp16 forward pass
        logits = model(X)
        loss = criterion(logits, y)

    scaler.scale(loss).backward()

    # Gradient clipping (before optimizer step)
    scaler.unscale_(optimizer)
    torch.nn.utils.clip_grad_norm_(
        model.parameters(), max_norm=1.0)

    scaler.step(optimizer)
    scaler.update()`,
      },
      {
        title: "Custom Weight Init",
        code: `import torch.nn as nn

def init_weights(m):
    if isinstance(m, nn.Linear):
        nn.init.xavier_uniform_(m.weight)
        nn.init.zeros_(m.bias)
    elif isinstance(m, nn.Conv2d):
        nn.init.kaiming_normal_(
            m.weight, mode='fan_out',
            nonlinearity='relu')
    elif isinstance(m, nn.BatchNorm2d):
        nn.init.ones_(m.weight)
        nn.init.zeros_(m.bias)

model.apply(init_weights)

# Other init options:
# nn.init.normal_(t, mean=0, std=1)
# nn.init.uniform_(t, a=0, b=1)
# nn.init.constant_(t, val)
# nn.init.orthogonal_(t)`,
      },
      {
        title: "Multi-GPU: DataParallel",
        code: `# Simple multi-GPU (single machine)
model = nn.DataParallel(model)
model = model.cuda()

# Preferred: DistributedDataParallel
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

dist.init_process_group("nccl")
rank = dist.get_rank()
model = model.to(rank)
model = DDP(model, device_ids=[rank])

# Sampler for DDP
from torch.utils.data.distributed import DistributedSampler
sampler = DistributedSampler(dataset)
loader = DataLoader(dataset, sampler=sampler)`,
      },
      {
        title: "torch.compile (PyTorch 2.x)",
        code: `# Compile model for speedup (PyTorch >= 2.0)
model = torch.compile(model)
# Modes: "default", "reduce-overhead", "max-autotune"
model = torch.compile(model, mode="max-autotune")

# Compile a function
@torch.compile
def my_func(x, y):
    return x * y + torch.sigmoid(x)

# Dynamic shapes
model = torch.compile(model, dynamic=True)`,
      },
      {
        title: "Hooks",
        code: `# Forward hook (inspect activations)
activations = {}

def hook_fn(module, input, output):
    activations['layer1'] = output.detach()

handle = model.layer1.register_forward_hook(hook_fn)

# Backward hook (inspect gradients)
def grad_hook(module, grad_in, grad_out):
    print(grad_out[0].shape)

handle2 = model.layer1.register_full_backward_hook(
    grad_hook)

# Remove hooks
handle.remove()
handle2.remove()`,
      },
      {
        title: "JIT / TorchScript",
        code: `import torch.jit as jit

# Script (static analysis)
scripted = torch.jit.script(model)
scripted.save("model_scripted.pt")

# Trace (record actual run)
example = torch.randn(1, 784)
traced = torch.jit.trace(model, example)
traced.save("model_traced.pt")

# Load saved TorchScript model
loaded = torch.jit.load("model_scripted.pt")
out = loaded(example)`,
      },
      {
        title: "ONNX Export",
        code: `# Export to ONNX for cross-framework deployment
dummy = torch.randn(1, 3, 224, 224)

torch.onnx.export(
    model, dummy,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={
        "input":  {0: "batch_size"},
        "output": {0: "batch_size"},
    },
    opset_version=17,
)

# Verify with onnx library
import onnx
onnx_model = onnx.load("model.onnx")
onnx.checker.check_model(onnx_model)`,
      },
    ],
  },
];

export default function PyTorchCheatsheet() {
  const [active, setActive] = useState("tensors");
  const [copied, setCopied] = useState(null);

  const section = sections.find((s) => s.id === active);

  const copy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", background: "#0d1117", minHeight: "100vh", color: "#e6edf3" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)", borderBottom: "1px solid #21262d", padding: "24px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "#EE4C2C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900 }}>🔥</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>PyTorch Cheat Sheet</div>
            <div style={{ fontSize: 12, color: "#7d8590", marginTop: 2 }}>From basic tensors to advanced deployment</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{
              padding: "6px 14px", borderRadius: 6, border: "1px solid",
              borderColor: active === s.id ? s.color : "#30363d",
              background: active === s.id ? s.color + "22" : "transparent",
              color: active === s.id ? s.color : "#7d8590",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", letterSpacing: 0.3, transition: "all 0.15s"
            }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 32px", display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(540px, 1fr))" }}>
        {section.snippets.map((snip, i) => (
          <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 10, overflow: "hidden" }}>
            {/* Card header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", background: "#1c2128", borderBottom: "1px solid #21262d" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: section.color }}>{snip.title}</span>
              <button onClick={() => copy(snip.code, `${active}-${i}`)} style={{
                padding: "3px 10px", borderRadius: 5, border: "1px solid #30363d",
                background: copied === `${active}-${i}` ? "#238636" : "#21262d",
                color: copied === `${active}-${i}` ? "#fff" : "#7d8590",
                fontSize: 11, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
              }}>
                {copied === `${active}-${i}` ? "✓ Copied" : "Copy"}
              </button>
            </div>
            {/* Code */}
            <pre style={{
              margin: 0, padding: "16px", fontSize: 12, lineHeight: 1.7,
              overflowX: "auto", color: "#e6edf3", background: "transparent"
            }}>
              <code>{snip.code.trim()}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}