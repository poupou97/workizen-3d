// WorkizenScaleValidator.cs
// Unity Editor tool for Workizen HQ Campus.
// Scans selected scene objects, measures bounding boxes, and compares
// against the Workizen Scale Standard (1 Unity Unit = 1 Meter).
//
// Usage:
//   1. Select one or more GameObjects in the Hierarchy.
//   2. Open: Tools > Workizen > Scale Validator
//   3. Click "Validate Selected Objects".
//   4. Review the report. Use "Export Report" to write results/review/workizen-scale-validation-report.md.
//
// Reference: docs/art-direction/workizen-scale-style-guide.md

using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEditor;
using UnityEngine;

namespace Workizen.Editor
{
    public class WorkizenScaleValidator : EditorWindow
    {
        // ── Object Categories ─────────────────────────────────────────────────

        public enum ObjectCategory
        {
            HumanCitizen,
            KnowledgeCitizen,
            AIAgentRobot,
            ComputeCitizen,
            BambooCluster,
            CherryBlossom,
            PalmTree,
            DeciduousTree,
            PineTree,
            LargeTree,
            ParkBench,
            Fountain,
            Bookshelf,
            Desk,
            Pier,
            InfoBoard,
            Blimp,
            MainRoad,
            Footpath,
            Plaza,
            StandardDoor,
            BuildingEntrance,
            LandmarkGate,
            FounderTower,
            KnowledgeLibrary,
            ComputeCenter,
            OpportunityCenter,
            TeamOffice,
            AIAgentLab,
            SmallDistrictBuilding,
            StandardDistrictBuilding,
            Unknown,
        }

        // ── Scale Rules ───────────────────────────────────────────────────────

        [Serializable]
        public struct ScaleRule
        {
            public ObjectCategory category;
            public string displayName;
            // Height (Y axis)
            public float targetH;
            public float minH;
            public float maxH;
            // Width (X axis) — 0 means unconstrained
            public float minW;
            public float maxW;
            // Depth (Z axis) — 0 means unconstrained
            public float minD;
            public float maxD;
            public string notes;
        }

        static readonly ScaleRule[] Rules = new ScaleRule[]
        {
            // ── Characters ───────────────────────────────────────────────────
            new ScaleRule { category = ObjectCategory.HumanCitizen,
                displayName = "Human Citizen",
                targetH = 1.20f, minH = 1.10f, maxH = 1.30f,
                minW = 0.30f, maxW = 0.70f, minD = 0.30f, maxD = 0.70f,
                notes = "Chibi low-poly, head ≥ 30% of total height" },

            new ScaleRule { category = ObjectCategory.KnowledgeCitizen,
                displayName = "Knowledge Citizen",
                targetH = 1.15f, minH = 1.05f, maxH = 1.25f,
                minW = 0.30f, maxW = 0.70f, minD = 0.30f, maxD = 0.70f,
                notes = "Scholar variant — same proportions as Human Citizen" },

            new ScaleRule { category = ObjectCategory.AIAgentRobot,
                displayName = "AI Agent (Robot)",
                targetH = 1.10f, minH = 1.00f, maxH = 1.40f,
                minW = 0.30f, maxW = 0.80f, minD = 0.30f, maxD = 0.80f,
                notes = "Antenna tip counts toward height" },

            new ScaleRule { category = ObjectCategory.ComputeCitizen,
                displayName = "Compute Citizen (Kiosk)",
                targetH = 0.85f, minH = 0.70f, maxH = 1.00f,
                minW = 0.50f, maxW = 1.00f, minD = 0.30f, maxD = 0.70f,
                notes = "Terminal/kiosk form — not a humanoid" },

            // ── Vegetation ───────────────────────────────────────────────────
            new ScaleRule { category = ObjectCategory.BambooCluster,
                displayName = "Bamboo Cluster",
                targetH = 2.50f, minH = 2.00f, maxH = 3.00f,
                minW = 0.30f, maxW = 1.80f, minD = 0.30f, maxD = 1.80f,
                notes = "Thin vertical cluster" },

            new ScaleRule { category = ObjectCategory.CherryBlossom,
                displayName = "Cherry Blossom",
                targetH = 3.50f, minH = 3.00f, maxH = 4.50f,
                minW = 1.50f, maxW = 5.50f, minD = 1.50f, maxD = 5.50f,
                notes = "Wide canopy — must stay below palm line" },

            new ScaleRule { category = ObjectCategory.PalmTree,
                displayName = "Palm Tree",
                targetH = 4.50f, minH = 4.00f, maxH = 5.50f,
                minW = 1.00f, maxW = 5.00f, minD = 1.00f, maxD = 5.00f,
                notes = "Tropical accent — must not enter camera foreground zone" },

            new ScaleRule { category = ObjectCategory.DeciduousTree,
                displayName = "Deciduous Tree (Synty)",
                targetH = 4.69f, minH = 4.00f, maxH = 5.50f,
                minW = 2.00f, maxW = 6.50f, minD = 2.00f, maxD = 6.50f,
                notes = "Synty SM_Env_Tree_01 — import scale 0.01 is calibrated" },

            new ScaleRule { category = ObjectCategory.PineTree,
                displayName = "Pine Tree (Synty)",
                targetH = 5.48f, minH = 5.00f, maxH = 6.50f,
                minW = 1.50f, maxW = 4.50f, minD = 1.50f, maxD = 4.50f,
                notes = "Synty SM_Env_Tree_Pine_01 — import scale 0.01 is calibrated" },

            new ScaleRule { category = ObjectCategory.LargeTree,
                displayName = "Large Tree (Synty)",
                targetH = 4.65f, minH = 4.00f, maxH = 5.50f,
                minW = 2.00f, maxW = 7.50f, minD = 2.00f, maxD = 7.50f,
                notes = "Synty SM_Env_Tree_Large_01 — import scale 0.004 is calibrated" },

            // ── Props ────────────────────────────────────────────────────────
            new ScaleRule { category = ObjectCategory.ParkBench,
                displayName = "Park Bench",
                targetH = 0.45f, minH = 0.38f, maxH = 0.55f,
                minW = 1.50f, maxW = 2.00f, minD = 0.45f, maxD = 0.70f,
                notes = "Seat surface height — must be clearly below character waist" },

            new ScaleRule { category = ObjectCategory.Fountain,
                displayName = "Fountain",
                targetH = 1.82f, minH = 1.50f, maxH = 2.00f,
                minW = 1.00f, maxW = 3.50f, minD = 1.00f, maxD = 3.50f,
                notes = "Synty SM_Prop_Fountain_01 — import scale 0.012" },

            new ScaleRule { category = ObjectCategory.Bookshelf,
                displayName = "Bookshelf",
                targetH = 2.19f, minH = 1.80f, maxH = 2.40f,
                minW = 0.80f, maxW = 1.50f, minD = 0.25f, maxD = 0.65f,
                notes = "Interior prop — Knowledge Library / Team Office" },

            new ScaleRule { category = ObjectCategory.Desk,
                displayName = "Desk",
                targetH = 1.05f, minH = 0.80f, maxH = 1.20f,
                minW = 1.00f, maxW = 2.20f, minD = 0.50f, maxD = 1.10f,
                notes = "Synty SM_Prop_Desk_01 — import scale 0.012" },

            new ScaleRule { category = ObjectCategory.Pier,
                displayName = "Pier / Dock",
                targetH = 1.50f, minH = 1.00f, maxH = 2.00f,
                minW = 1.50f, maxW = 6.00f, minD = 3.00f, maxD = 12.00f,
                notes = "rawH=0.377 — must use tripoH(1.5, 0.377) to avoid ground float" },

            new ScaleRule { category = ObjectCategory.InfoBoard,
                displayName = "Info Board",
                targetH = 1.80f, minH = 1.50f, maxH = 2.50f,
                minW = 0.40f, maxW = 1.40f, minD = 0.05f, maxD = 0.50f,
                notes = "Vertical sign — must not block sightlines to buildings" },

            new ScaleRule { category = ObjectCategory.Blimp,
                displayName = "Blimp / Airship",
                targetH = 4.00f, minH = 3.00f, maxH = 6.00f,
                minW = 2.50f, maxW = 5.00f, minD = 5.00f, maxD = 10.00f,
                notes = "Floating at Y ≥ 12m — horizontal craft, D is primary axis" },

            // ── Roads & Ground ────────────────────────────────────────────────
            new ScaleRule { category = ObjectCategory.MainRoad,
                displayName = "Main Campus Road",
                targetH = 0.00f, minH = 0.00f, maxH = 0.02f,
                minW = 3.00f, maxW = 4.00f, minD = 0f, maxD = 0f,
                notes = "Flush or micro-raised — no curb over 2 cm" },

            new ScaleRule { category = ObjectCategory.Footpath,
                displayName = "Footpath / Walkway",
                targetH = 0.01f, minH = 0.00f, maxH = 0.03f,
                minW = 1.20f, maxW = 2.00f, minD = 0f, maxD = 0f,
                notes = "Slight raise acceptable; no step unless intentional" },

            new ScaleRule { category = ObjectCategory.Plaza,
                displayName = "Central Plaza",
                targetH = 0.00f, minH = 0.00f, maxH = 0.05f,
                minW = 8.00f, maxW = 20.00f, minD = 8.00f, maxD = 20.00f,
                notes = "Central Citizen Plaza target 14×14 m" },

            // ── Doors ────────────────────────────────────────────────────────
            new ScaleRule { category = ObjectCategory.StandardDoor,
                displayName = "Standard Door",
                targetH = 2.10f, minH = 2.00f, maxH = 2.40f,
                minW = 0.90f, maxW = 1.20f, minD = 0.03f, maxD = 0.20f,
                notes = "Min 1.6× tallest character max (1.4 m) = 2.24 m" },

            new ScaleRule { category = ObjectCategory.BuildingEntrance,
                displayName = "Building Entrance",
                targetH = 2.40f, minH = 2.00f, maxH = 3.00f,
                minW = 1.50f, maxW = 3.00f, minD = 0.03f, maxD = 0.40f,
                notes = "Double door or arch frame" },

            new ScaleRule { category = ObjectCategory.LandmarkGate,
                displayName = "Landmark Gate",
                targetH = 3.00f, minH = 2.50f, maxH = 4.00f,
                minW = 2.00f, maxW = 5.00f, minD = 0.10f, maxD = 0.60f,
                notes = "AI Agent Lab main gate" },

            // ── Buildings ────────────────────────────────────────────────────
            new ScaleRule { category = ObjectCategory.FounderTower,
                displayName = "Founder Tower",
                targetH = 4.50f, minH = 4.00f, maxH = 6.00f,
                minW = 2.00f, maxW = 3.50f, minD = 2.00f, maxD = 3.20f,
                notes = "Landmark — must be visually taller than nearby trees" },

            new ScaleRule { category = ObjectCategory.KnowledgeLibrary,
                displayName = "Knowledge Library",
                targetH = 3.50f, minH = 3.00f, maxH = 5.00f,
                minW = 0f, maxW = 4.20f, minD = 0f, maxD = 4.20f,
                notes = "Wide arched facade" },

            new ScaleRule { category = ObjectCategory.ComputeCenter,
                displayName = "Compute Center",
                targetH = 3.50f, minH = 3.00f, maxH = 5.00f,
                minW = 0f, maxW = 4.20f, minD = 0f, maxD = 4.20f,
                notes = "Industrial blocky form" },

            new ScaleRule { category = ObjectCategory.OpportunityCenter,
                displayName = "Opportunity Center",
                targetH = 3.50f, minH = 3.00f, maxH = 5.00f,
                minW = 0f, maxW = 4.40f, minD = 0f, maxD = 4.40f,
                notes = "Dome marketplace form" },

            new ScaleRule { category = ObjectCategory.TeamOffice,
                displayName = "Team Office",
                targetH = 3.50f, minH = 3.00f, maxH = 5.00f,
                minW = 0f, maxW = 4.50f, minD = 0f, maxD = 4.50f,
                notes = "rawH=0.766 — must use tripoH(3.5, 0.766)" },

            new ScaleRule { category = ObjectCategory.AIAgentLab,
                displayName = "AI Agent Lab",
                targetH = 5.00f, minH = 4.50f, maxH = 8.00f,
                minW = 0f, maxW = 5.20f, minD = 0f, maxD = 4.40f,
                notes = "Main landmark — dominant tower above all other buildings" },

            new ScaleRule { category = ObjectCategory.SmallDistrictBuilding,
                displayName = "Small District Building",
                targetH = 3.50f, minH = 3.00f, maxH = 5.00f,
                minW = 0f, maxW = 5.00f, minD = 0f, maxD = 5.00f,
                notes = "Generic small building" },

            new ScaleRule { category = ObjectCategory.StandardDistrictBuilding,
                displayName = "Standard District Building",
                targetH = 4.00f, minH = 3.50f, maxH = 5.50f,
                minW = 0f, maxW = 6.00f, minD = 0f, maxD = 6.00f,
                notes = "Generic medium building" },
        };

        // ── Validation Result ─────────────────────────────────────────────────

        public enum ValidationStatus { OK, TOO_LARGE, TOO_SMALL, NEEDS_REVIEW }

        public struct ValidationResult
        {
            public GameObject go;
            public ObjectCategory category;
            public string categoryName;
            public Bounds bounds;
            public float w, h, d;
            public ValidationStatus status;
            public string flaggedAxes;
            public string suggestion;
        }

        // ── Editor Window ─────────────────────────────────────────────────────

        private List<ValidationResult> _results = new List<ValidationResult>();
        private Vector2 _scrollPos;
        private Dictionary<string, ObjectCategory> _nameMap;
        private bool _showOnlyIssues;
        private string _exportPath = "results/review/workizen-scale-validation-report.md";

        [MenuItem("Tools/Workizen/Scale Validator")]
        public static void OpenWindow()
        {
            var win = GetWindow<WorkizenScaleValidator>("Workizen Scale Validator");
            win.minSize = new Vector2(680, 480);
        }

        private void OnEnable()
        {
            BuildNameMap();
        }

        private void BuildNameMap()
        {
            // Keyword → category mapping used when no explicit assignment is found.
            // Checks object name (case-insensitive) for the first matching keyword.
            _nameMap = new Dictionary<string, ObjectCategory>(StringComparer.OrdinalIgnoreCase)
            {
                { "HumanCitizen",        ObjectCategory.HumanCitizen },
                { "KnowledgeCitizen",    ObjectCategory.KnowledgeCitizen },
                { "RobotCitizen",        ObjectCategory.AIAgentRobot },
                { "ComputeCitizen",      ObjectCategory.ComputeCitizen },
                { "Bamboo",              ObjectCategory.BambooCluster },
                { "CherryBlossom",       ObjectCategory.CherryBlossom },
                { "PalmTree",            ObjectCategory.PalmTree },
                { "Tree_01",             ObjectCategory.DeciduousTree },
                { "Tree_02",             ObjectCategory.DeciduousTree },
                { "Tree_Pine",           ObjectCategory.PineTree },
                { "Tree_Large",          ObjectCategory.LargeTree },
                { "ParkBench",           ObjectCategory.ParkBench },
                { "Bench",               ObjectCategory.ParkBench },
                { "Fountain",            ObjectCategory.Fountain },
                { "Bookshelf",           ObjectCategory.Bookshelf },
                { "Desk",                ObjectCategory.Desk },
                { "Pier",                ObjectCategory.Pier },
                { "InfoBoard",           ObjectCategory.InfoBoard },
                { "Blimp",               ObjectCategory.Blimp },
                { "Road",                ObjectCategory.MainRoad },
                { "Footpath",            ObjectCategory.Footpath },
                { "Path",                ObjectCategory.Footpath },
                { "Plaza",               ObjectCategory.Plaza },
                { "Door",                ObjectCategory.StandardDoor },
                { "Entrance",            ObjectCategory.BuildingEntrance },
                { "Gate",                ObjectCategory.LandmarkGate },
                { "FounderTower",        ObjectCategory.FounderTower },
                { "KnowledgeLibrary",    ObjectCategory.KnowledgeLibrary },
                { "ComputeCenter",       ObjectCategory.ComputeCenter },
                { "OpportunityCenter",   ObjectCategory.OpportunityCenter },
                { "TeamOffice",          ObjectCategory.TeamOffice },
                { "AIAgentLab",          ObjectCategory.AIAgentLab },
                { "AgentLab",            ObjectCategory.AIAgentLab },
            };
        }

        private ObjectCategory InferCategory(GameObject go)
        {
            string name = go.name;
            foreach (var kv in _nameMap)
                if (name.IndexOf(kv.Key, StringComparison.OrdinalIgnoreCase) >= 0)
                    return kv.Value;
            return ObjectCategory.Unknown;
        }

        private ScaleRule? FindRule(ObjectCategory cat)
        {
            foreach (var r in Rules)
                if (r.category == cat) return r;
            return null;
        }

        private void OnGUI()
        {
            EditorGUILayout.Space(6);
            EditorGUILayout.LabelField("Workizen Scale Validator", EditorStyles.boldLabel);
            EditorGUILayout.LabelField("Convention: 1 Unity Unit = 1 Meter", EditorStyles.miniLabel);
            EditorGUILayout.Space(4);

            using (new EditorGUILayout.HorizontalScope())
            {
                if (GUILayout.Button("Validate Selected Objects", GUILayout.Height(30)))
                    RunValidation();

                if (GUILayout.Button("Clear", GUILayout.Width(70), GUILayout.Height(30)))
                    _results.Clear();
            }

            EditorGUILayout.Space(4);

            using (new EditorGUILayout.HorizontalScope())
            {
                _showOnlyIssues = EditorGUILayout.ToggleLeft("Show only issues", _showOnlyIssues, GUILayout.Width(160));
                GUILayout.FlexibleSpace();
                EditorGUILayout.LabelField($"{_results.Count} objects scanned", EditorStyles.miniLabel);
            }

            EditorGUILayout.Space(4);

            // Results table header
            using (new EditorGUILayout.HorizontalScope(EditorStyles.toolbar))
            {
                GUILayout.Label("Object", GUILayout.Width(200));
                GUILayout.Label("Category", GUILayout.Width(150));
                GUILayout.Label("W", GUILayout.Width(55));
                GUILayout.Label("H", GUILayout.Width(55));
                GUILayout.Label("D", GUILayout.Width(55));
                GUILayout.Label("Status", GUILayout.Width(100));
                GUILayout.Label("Suggestion");
            }

            _scrollPos = EditorGUILayout.BeginScrollView(_scrollPos);

            foreach (var r in _results)
            {
                if (_showOnlyIssues && r.status == ValidationStatus.OK) continue;

                Color bg = r.status switch
                {
                    ValidationStatus.OK => new Color(0.2f, 0.7f, 0.2f, 0.15f),
                    ValidationStatus.TOO_LARGE => new Color(0.9f, 0.2f, 0.2f, 0.20f),
                    ValidationStatus.TOO_SMALL => new Color(0.9f, 0.6f, 0.1f, 0.20f),
                    ValidationStatus.NEEDS_REVIEW => new Color(0.5f, 0.5f, 0.9f, 0.20f),
                    _ => Color.clear,
                };

                var oldBg = GUI.backgroundColor;
                GUI.backgroundColor = bg;

                using (new EditorGUILayout.HorizontalScope("box"))
                {
                    GUI.backgroundColor = oldBg;

                    if (GUILayout.Button(r.go != null ? r.go.name : "(null)", EditorStyles.linkLabel, GUILayout.Width(200)))
                    {
                        Selection.activeGameObject = r.go;
                        EditorGUIUtility.PingObject(r.go);
                    }

                    GUILayout.Label(r.categoryName, GUILayout.Width(150));
                    GUILayout.Label($"{r.w:F2}m", GUILayout.Width(55));
                    GUILayout.Label($"{r.h:F2}m", GUILayout.Width(55));
                    GUILayout.Label($"{r.d:F2}m", GUILayout.Width(55));
                    GUILayout.Label(r.status.ToString(), GUILayout.Width(100));
                    GUILayout.Label(r.suggestion, EditorStyles.wordWrappedMiniLabel);
                }
            }

            EditorGUILayout.EndScrollView();

            EditorGUILayout.Space(6);

            using (new EditorGUILayout.HorizontalScope())
            {
                _exportPath = EditorGUILayout.TextField(_exportPath);
                if (GUILayout.Button("Export Report", GUILayout.Width(110)))
                    ExportReport();
            }

            EditorGUILayout.Space(4);
        }

        private void RunValidation()
        {
            _results.Clear();

            var selected = Selection.gameObjects;
            if (selected == null || selected.Length == 0)
            {
                EditorUtility.DisplayDialog("Workizen Scale Validator",
                    "No objects selected. Select one or more GameObjects in the Hierarchy.", "OK");
                return;
            }

            foreach (var go in selected)
            {
                var result = ValidateObject(go);
                _results.Add(result);
            }
        }

        private ValidationResult ValidateObject(GameObject go)
        {
            // Compute world-space bounding box from all renderers
            var renderers = go.GetComponentsInChildren<Renderer>(true);
            Bounds bounds = new Bounds(go.transform.position, Vector3.zero);
            bool hasMesh = false;

            foreach (var r in renderers)
            {
                if (!hasMesh) { bounds = r.bounds; hasMesh = true; }
                else bounds.Encapsulate(r.bounds);
            }

            float w = hasMesh ? bounds.size.x : 0f;
            float h = hasMesh ? bounds.size.y : 0f;
            float d = hasMesh ? bounds.size.z : 0f;

            var cat = InferCategory(go);
            var rule = FindRule(cat);

            var result = new ValidationResult
            {
                go = go,
                category = cat,
                categoryName = cat == ObjectCategory.Unknown ? "Unknown" : cat.ToString(),
                bounds = bounds,
                w = w, h = h, d = d,
            };

            if (!rule.HasValue || cat == ObjectCategory.Unknown)
            {
                result.status = ValidationStatus.NEEDS_REVIEW;
                result.suggestion = "No rule matched. Assign a category tag or rename the object to include a known keyword.";
                return result;
            }

            var r2 = rule.Value;
            var flagged = new List<string>();
            bool tooLarge = false, tooSmall = false;

            // Height check
            if (h > r2.maxH) { tooLarge = true; flagged.Add($"H={h:F2}m > max {r2.maxH}m"); }
            else if (h < r2.minH) { tooSmall = true; flagged.Add($"H={h:F2}m < min {r2.minH}m"); }

            // Width check (skip if max == 0 = unconstrained)
            if (r2.maxW > 0)
            {
                if (w > r2.maxW) { tooLarge = true; flagged.Add($"W={w:F2}m > max {r2.maxW}m"); }
                else if (r2.minW > 0 && w < r2.minW) { tooSmall = true; flagged.Add($"W={w:F2}m < min {r2.minW}m"); }
            }

            // Depth check (skip if max == 0 = unconstrained)
            if (r2.maxD > 0)
            {
                if (d > r2.maxD) { tooLarge = true; flagged.Add($"D={d:F2}m > max {r2.maxD}m"); }
                else if (r2.minD > 0 && d < r2.minD) { tooSmall = true; flagged.Add($"D={d:F2}m < min {r2.minD}m"); }
            }

            if (tooLarge && tooSmall)
            {
                result.status = ValidationStatus.NEEDS_REVIEW;
            }
            else if (tooLarge)
            {
                result.status = ValidationStatus.TOO_LARGE;
            }
            else if (tooSmall)
            {
                result.status = ValidationStatus.TOO_SMALL;
            }
            else
            {
                result.status = ValidationStatus.OK;
            }

            result.flaggedAxes = flagged.Count > 0 ? string.Join("; ", flagged) : "—";
            result.suggestion = BuildSuggestion(result, r2);

            return result;
        }

        private string BuildSuggestion(ValidationResult r, ScaleRule rule)
        {
            if (r.status == ValidationStatus.OK) return "✓ Within spec.";

            var sb = new StringBuilder();

            if (r.status == ValidationStatus.TOO_LARGE || r.status == ValidationStatus.TOO_SMALL)
            {
                sb.Append($"Flagged: {r.flaggedAxes}. ");

                // Height fix suggestion
                if (r.h > 0 && rule.targetH > 0)
                {
                    float suggestedScale = rule.targetH / r.h;
                    sb.Append($"Suggested uniform scale multiplier: ×{suggestedScale:F3} ");
                    sb.Append($"(to reach target H={rule.targetH:F2}m). ");
                }

                sb.Append("DO NOT auto-rescale — review in context first.");

                if (!string.IsNullOrEmpty(rule.notes))
                    sb.Append($" Note: {rule.notes}");
            }
            else
            {
                sb.Append($"Dimensions in range but needs art director review. {rule.notes}");
            }

            return sb.ToString();
        }

        // ── Export ────────────────────────────────────────────────────────────

        private void ExportReport()
        {
            if (_results.Count == 0)
            {
                EditorUtility.DisplayDialog("Export", "No results to export. Run validation first.", "OK");
                return;
            }

            string projectRoot = Path.GetFullPath(Path.Combine(Application.dataPath, ".."));
            string fullPath = Path.Combine(projectRoot, _exportPath);
            Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

            var sb = new StringBuilder();
            sb.AppendLine("# Workizen Scale Validation Report");
            sb.AppendLine();
            sb.AppendLine($"**Generated:** {DateTime.Now:yyyy-MM-dd HH:mm}  ");
            sb.AppendLine($"**Convention:** 1 Unity Unit = 1 Meter  ");
            sb.AppendLine($"**Objects scanned:** {_results.Count}  ");
            sb.AppendLine($"**Scene:** {UnityEngine.SceneManagement.SceneManager.GetActiveScene().name}  ");
            sb.AppendLine();

            // Summary counts
            int ok = 0, large = 0, small = 0, review = 0;
            foreach (var r in _results)
            {
                switch (r.status)
                {
                    case ValidationStatus.OK: ok++; break;
                    case ValidationStatus.TOO_LARGE: large++; break;
                    case ValidationStatus.TOO_SMALL: small++; break;
                    case ValidationStatus.NEEDS_REVIEW: review++; break;
                }
            }

            sb.AppendLine("## Summary");
            sb.AppendLine();
            sb.AppendLine($"| Status | Count |");
            sb.AppendLine($"|--------|-------|");
            sb.AppendLine($"| OK | {ok} |");
            sb.AppendLine($"| TOO_LARGE | {large} |");
            sb.AppendLine($"| TOO_SMALL | {small} |");
            sb.AppendLine($"| NEEDS_REVIEW | {review} |");
            sb.AppendLine();

            sb.AppendLine("## Results");
            sb.AppendLine();
            sb.AppendLine("| Object | Category | W (m) | H (m) | D (m) | Status | Suggestion |");
            sb.AppendLine("|--------|----------|-------|-------|-------|--------|------------|");

            foreach (var r in _results)
            {
                string statusBadge = r.status switch
                {
                    ValidationStatus.OK => "✅ OK",
                    ValidationStatus.TOO_LARGE => "🔴 TOO_LARGE",
                    ValidationStatus.TOO_SMALL => "🟡 TOO_SMALL",
                    ValidationStatus.NEEDS_REVIEW => "🔵 NEEDS_REVIEW",
                    _ => r.status.ToString(),
                };

                string name = r.go != null ? r.go.name : "(null)";
                string suggestion = r.suggestion.Replace("|", "\\|");
                sb.AppendLine($"| {name} | {r.categoryName} | {r.w:F2} | {r.h:F2} | {r.d:F2} | {statusBadge} | {suggestion} |");
            }

            sb.AppendLine();
            sb.AppendLine("## Auto-Fix Suggestions");
            sb.AppendLine();
            sb.AppendLine("> **IMPORTANT:** These are suggestions only. Do NOT auto-rescale without Art Director approval.");
            sb.AppendLine("> Apply fixes in context — a building that looks right in context may differ from raw spec.");
            sb.AppendLine();

            bool anyFix = false;
            foreach (var r in _results)
            {
                if (r.status == ValidationStatus.OK || r.status == ValidationStatus.NEEDS_REVIEW) continue;
                anyFix = true;
                string name = r.go != null ? r.go.name : "(null)";
                sb.AppendLine($"### {name} ({r.status})");
                sb.AppendLine();
                sb.AppendLine($"{r.suggestion}");
                sb.AppendLine();
            }

            if (!anyFix)
                sb.AppendLine("No scale fixes needed — all objects within spec.");

            sb.AppendLine();
            sb.AppendLine("---");
            sb.AppendLine($"*Generated by WorkizenScaleValidator.cs — Workizen HQ Campus*");

            File.WriteAllText(fullPath, sb.ToString());
            AssetDatabase.Refresh();

            EditorUtility.DisplayDialog("Export Complete",
                $"Report saved to:\n{_exportPath}", "Open Folder");

            EditorUtility.RevealInFinder(fullPath);
        }
    }
}
