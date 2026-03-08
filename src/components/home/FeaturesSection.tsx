import {
  Shield,
  Lock,
  Eye,
  Fingerprint,
  FileCheck,
  Globe,
  Mail,
  Calendar
} from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  {
    icon: Lock,
    titleKey: "feat_1_title",
    descKey: "feat_1_desc",
    color: "from-primary to-navy-500",
  },
  {
    icon: Fingerprint,
    titleKey: "feat_2_title",
    descKey: "feat_2_desc",
    color: "from-secondary to-saffron-600",
  },
  {
    icon: Eye,
    titleKey: "feat_3_title",
    descKey: "feat_3_desc",
    color: "from-accent to-emerald-400",
  },
  {
    icon: Shield,
    titleKey: "feat_4_title",
    descKey: "feat_4_desc",
    color: "from-primary to-secondary",
  },
  {
    icon: FileCheck,
    titleKey: "feat_5_title",
    descKey: "feat_5_desc",
    color: "from-emerald-500 to-accent",
  },
  {
    icon: Globe,
    titleKey: "feat_6_title",
    descKey: "feat_6_desc",
    color: "from-navy-400 to-primary",
  },
  {
    icon: Mail,
    titleKey: "feat_7_title",
    descKey: "feat_7_desc",
    color: "from-saffron-500 to-secondary",
  },
  {
    icon: Calendar,
    titleKey: "feat_8_title",
    descKey: "feat_8_desc",
    color: "from-accent to-primary",
  },
];

const FeaturesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-32 bg-transparent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-sm">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>{t("feat_badge")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("feat_title_part1")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("feat_title_part2")}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("feat_subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.titleKey}
              className="group relative bg-card/10 backdrop-blur-md rounded-2xl p-6 shadow-soft border border-white/10 hover:shadow-large hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-medium mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(feature.descKey)}
              </p>

              {/* Hover Glow */}
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
