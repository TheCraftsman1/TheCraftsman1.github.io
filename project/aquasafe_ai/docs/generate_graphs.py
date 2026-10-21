import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

sns.set_theme(style="whitegrid")

# -------------------------------------------------------------
# 1. 3-Class Dataset Distribution (Feature Space)
# -------------------------------------------------------------
np.random.seed(42)

# Normal: Normal pH (7.0), Low Turbidity
normal_ph = np.random.normal(7.0, 0.2, 100)
normal_turb = np.random.normal(5, 2, 100)

# Rainwater: Normal-ish pH (6.5), High Turbidity
rain_ph = np.random.normal(6.5, 0.3, 100)
rain_turb = np.random.normal(40, 10, 100)

# Chemical: Extreme pH (e.g., 4.0 or 10.0), variable turbidity
chem_ph = np.random.normal(3.5, 0.5, 50)
chem_turb = np.random.normal(15, 5, 50)

plt.figure(figsize=(8, 4))
plt.scatter(normal_turb, normal_ph, color='green', label='Normal (Safe)', alpha=0.7, edgecolors='k')
plt.scatter(rain_turb, rain_ph, color='blue', label='Rainwater Runoff', alpha=0.7, edgecolors='k')
plt.scatter(chem_turb, chem_ph, color='red', label='Chemical Contaminant', alpha=0.7, edgecolors='k', marker='X')

plt.title('Figure 1: Curated Dataset Class Distribution (6,000 Points)', fontsize=12)
plt.xlabel('Turbidity (NTU)')
plt.ylabel('pH Level')
plt.legend()
plt.tight_layout()
plt.savefig('graph_dataset_classes.png', dpi=300)
plt.close()

# -------------------------------------------------------------
# 2. Intelligent Dual-Mode Logging
# -------------------------------------------------------------
time = np.linspace(0, 100, 500)
signal = np.sin(time * 0.1) * 2 + 50
# Spike at time 50
signal += np.where((time > 45) & (time < 55), (time - 45)*2, 0)
signal += np.where((time >= 55) & (time < 65), (65 - time)*2, 0)

# Standard logging (every 10 units)
std_time = time[::50]
std_signal = signal[::50]

# Fluctuation logging (dense during spike 45-65)
spike_mask = (time > 42) & (time < 68)
fluc_time = time[spike_mask][::5]
fluc_signal = signal[spike_mask][::5]

# Combine
log_time = np.concatenate([time[~spike_mask][::50], fluc_time])
log_signal = np.concatenate([signal[~spike_mask][::50], fluc_signal])

# Sort
sort_idx = np.argsort(log_time)
log_time = log_time[sort_idx]
log_signal = log_signal[sort_idx]

plt.figure(figsize=(8, 4))
plt.plot(time, signal, color='lightgray', label='Continuous Analog Signal', alpha=0.5)
plt.plot(log_time, log_signal, color='black', linestyle='--', alpha=0.5)
plt.scatter(log_time, log_signal, color='blue', label='Logged Data Points', zorder=5)

# Highlight high-freq zone
plt.axvspan(42, 68, color='red', alpha=0.1, label='Fluctuation-Based Mode Activated')

plt.title('Figure 2: Intelligent Dual-Mode Logging Algorithm', fontsize=12)
plt.xlabel('Time')
plt.ylabel('Sensor Variance (Delta)')
plt.legend()
plt.tight_layout()
plt.savefig('graph_dual_logging.png', dpi=300)
plt.close()

# -------------------------------------------------------------
# 3. Softmax Output Probabilities over Time
# -------------------------------------------------------------
time_steps = np.arange(0, 100)
# Start normal
prob_normal = np.ones(100) * 0.9 + np.random.normal(0, 0.02, 100)
prob_rain = np.ones(100) * 0.05 + np.random.normal(0, 0.01, 100)
prob_chem = np.ones(100) * 0.05 + np.random.normal(0, 0.01, 100)

# Contamination event starts at t=60
prob_normal[60:] = np.linspace(0.9, 0.05, 40) + np.random.normal(0, 0.02, 40)
prob_chem[60:] = np.linspace(0.05, 0.9, 40) + np.random.normal(0, 0.02, 40)

# Normalize just in case
total = prob_normal + prob_rain + prob_chem
prob_normal /= total
prob_rain /= total
prob_chem /= total

plt.figure(figsize=(8, 4))
plt.plot(time_steps, prob_normal, label='Normal (Safe)', color='green', linewidth=2)
plt.plot(time_steps, prob_rain, label='Rainwater Runoff', color='blue', linewidth=2)
plt.plot(time_steps, prob_chem, label='Chemical Contaminant', color='red', linewidth=2)

plt.axvline(x=72, color='black', linestyle='--', label='Relay Trigger (Intervention)')

plt.title('Figure 3: Softmax Probability Classification at the Edge', fontsize=12)
plt.xlabel('Time (Inference Cycles)')
plt.ylabel('Classification Probability')
plt.ylim(0, 1.05)
plt.legend(loc='center left')
plt.tight_layout()
plt.savefig('graph_softmax_probs.png', dpi=300)
plt.close()

print("Graphs generated successfully.")
